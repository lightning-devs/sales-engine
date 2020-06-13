import { Injectable } from '@nestjs/common';
import { SequencerService } from './sequencer.service';
import { Product } from '@lightning/typing';
import isEmpty from 'lodash/isEmpty';

import sourcesSequences from '../sequences';

@Injectable()
export class DataSourcesService {

    constructor(private resolverService: SequencerService) {}

    searchByDataSources(sources: string[], requestParams): Promise<Product[]> {
        // Transformers generated from the stores' sequences
        const transformers = sources
            .map(source => sourcesSequences[source])
            .filter(sequence => !isEmpty(sequence))
            .map(sequence => this.resolverService.getTransformer(sequence));

        // A transformer returns a Promise with the final result it got using a transformation sequence
        const transformedPromises = transformers.map(transformer => transformer(requestParams));
        return Promise.all(transformedPromises);
    }
}
