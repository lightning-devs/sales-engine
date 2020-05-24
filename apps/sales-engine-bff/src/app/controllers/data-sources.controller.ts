import { Controller, Get, Post, Req, Res, Query } from '@nestjs/common';
import { DataSourcesService } from '../services/data-sources.service';
import { Response } from 'express';

import drivers from '../drivers/';

@Controller('dataSources')
export class DataSourcesController {

    constructor(private dataSourcesService: DataSourcesService) {}

    @Get()
    getAllDataSources() {
        return drivers;
    }

    @Get('search')
    searchOnDataSources(@Res() response: Response,
                        @Query('sources') sources: string[],
                        @Query('keyword') keyword: string) {
        
    }

}