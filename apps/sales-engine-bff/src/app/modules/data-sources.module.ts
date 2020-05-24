import { Module, HttpModule } from '@nestjs/common';

import { DataSourcesService } from '../services/data-sources.service';
import { DataSourcesController } from '../controllers/data-sources.controller';

@Module({
    imports: [HttpModule],
    providers: [DataSourcesService],
    controllers: [DataSourcesController]
})
export class DataSourcesModule {}