import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DataSourcesModule } from './modules/data-sources.module';

@Module({
  imports: [
    DataSourcesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
