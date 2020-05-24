import { Module, HttpModule } from '@nestjs/common';

import { DataSourcesService } from '../services/data-sources.service';
import { DataSourcesController } from '../controllers/data-sources.controller';
import { ResolverService } from '../services/resolver.services';

@Module({
    imports: [HttpModule],
    providers: [DataSourcesService, ResolverService],
    controllers: [DataSourcesController]
})
export class DataSourcesModule {}