import { Injectable } from '@nestjs/common';
import { ResolverService } from './resolver.services';
import { Product } from '@lightning/typing';

import drivers from '../drivers';

@Injectable()
export class DataSourcesService {

    constructor(private resolverService: ResolverService) {}

    resolverCaller = keyword => driver => {
        return this.resolverService.searchByDriver(driver, keyword);
    }
    searchByDataSources(sources: string[], keyword): Promise<Product[]> {
        const currentDrivers = sources.map(source => drivers[source]).filter(driver => driver);

        const resolvedPromises = currentDrivers.map(this.resolverCaller(keyword));
        return Promise.all(resolvedPromises);
    }
}
