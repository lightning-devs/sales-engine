import { Injectable, HttpService } from '@nestjs/common';
import { getSequencer } from '@lightning-devs/sequences';
import { getConditioner } from '@lightning-devs/conditioners';
import { seFunctions } from '../utils/salesEngineFunctions';
import fp from 'lodash/fp';
import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';
import FormData from 'form-data';

const JSON_TYPE = 'application/json';
const FORM_DATA_TYPE = 'form-data';
const HTTP_VERBS = {
    POST: 'POST',
    GET: 'GET',
    PUT: 'PUT'
};

@Injectable()
export class SequencerService {
    private readonly sequencer;

    constructor(private httpService: HttpService) {
        this.sequencer = this.getSeq();
    }

    private getFetch() {
        return (sequenceParams) => (requestData) => {
            const url = isString(requestData) ? requestData : requestData.url;
            const { data = null } = requestData;
            const { method, headers, contentType } = sequenceParams;
            const httpMethod = method.toLocaleLowerCase();
            const params = {
                url,
                body: null,
                config: {}
            };
            if (headers) {
                params.config['headers'] = headers;
            }
            if (!isEmpty(data)) {
                if (contentType === JSON_TYPE) {
                    params.body = JSON.stringify(data);
                } else if (contentType === FORM_DATA_TYPE) {
                    const formData = new FormData();
                    Object.entries(data).forEach(([key, value]) => formData.append(key, `${value}`));
                    params.body = formData;
                    params.config['headers'] = { ...formData.getHeaders() }
                }
            }

            if (method === HTTP_VERBS.GET) {
                return this.httpService.get(params.url, params.config).toPromise();
            }
            return this.httpService[httpMethod](params.url, params.body, params.config).toPromise();
        }
    }

    private getSeq() {
        let sourceFunctions = [
            fp,
            seFunctions,
        ]
        const conditioner = getConditioner({ sources: sourceFunctions });
        sourceFunctions = [
            ...sourceFunctions,
            {
                fetch: this.getFetch(),
                condition: conditioner,
            }
        ]
        return getSequencer(...sourceFunctions);
    }

    getTransformer(sequence) {
        if (isEmpty(sequence)) throw new Error('A sequence is required');
        return this.sequencer(sequence);
    }

}
