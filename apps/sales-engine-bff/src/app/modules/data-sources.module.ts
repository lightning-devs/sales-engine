import { Module, HttpModule } from '@nestjs/common';

import { DataSourcesService } from '../services/data-sources.service';
import { StoresController } from '../controllers/data-sources.controller';
import { SequencerService } from '../services/sequencer.service';

@Module({
    imports: [HttpModule],
    providers: [DataSourcesService, SequencerService],
    controllers: [StoresController]
})
export class DataSourcesModule {}
