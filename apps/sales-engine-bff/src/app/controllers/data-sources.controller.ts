import { Controller, Get, Query } from '@nestjs/common';
import { DataSourcesService } from '../services/data-sources.service';

import sequences from '../sequences/';

@Controller('dataSources')
export class DataSourcesController {

    constructor(private sourcesService: DataSourcesService) {}

    @Get()
    getAllDataSources() {
        return Object.values(sequences).map(({ id, name , logo, color }) => ({ id, name, logo, color }));
    }

    @Get('search')
    async searchOnDataSources(
        @Query('stores') stores: string,
        @Query('keyword') keyword: string,
    ) {
        console.log(stores);
        console.log(keyword);
        const sources = stores.split(',');
        try {
            const products = await this.sourcesService.searchByDataSources(sources, { keyword } );
            return products;
        } catch (error) {
            return error
        }

    }

}
