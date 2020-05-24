import { Controller, Get, Post, Req } from '@nestjs/common';
import drivers from '../drivers/';

@Controller('dataSources')
export class DataSourcesController {

    @Get()
    getAllDataSources() {
        return drivers;
    }

}