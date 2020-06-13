import { Module, HttpModule } from '@nestjs/common';

import { DataSourcesService } from '../services/data-sources.service';
import { DataSourcesController } from '../controllers/data-sources.controller';
import { SequencerService } from '../services/sequencer.service';

@Module({
    imports: [HttpModule],
    providers: [DataSourcesService, SequencerService],
    controllers: [DataSourcesController]
})
export class DataSourcesModule {}
