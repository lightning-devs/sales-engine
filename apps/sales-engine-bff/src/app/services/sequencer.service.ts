import { Injectable, HttpService } from '@nestjs/common';
import { getSequencer } from '@lightning/sequences';
import fp from 'lodash/fp';
import { seFunctions } from '../utils/salesEngineFunctions';
import isEmpty from 'lodash/isEmpty';
import { getConditioner } from '../../../../../libs/sequences/src/lib/conditioners';

@Injectable()
export class SequencerService {
    private readonly sequencer;

    constructor(private httpService: HttpService) {
        this.sequencer = this.getSeq();
    }

    private getFetch() {
        return (sequenceParams) => async (url) => {
            const { method, headers, body } = sequenceParams;
            const httpMethod = method.toLocaleLowerCase();
            const params: any = [url];
            if (body) {
                params.push(body);
            }
            if (headers) {
                params.push(headers);
            }
            return await this.httpService[httpMethod](...params).toPromise();
        }
    }

    private getSeq() {
        let sourceFunctions = [
            fp,
            seFunctions,
        ]
        const conditioner = getConditioner(...sourceFunctions);
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
