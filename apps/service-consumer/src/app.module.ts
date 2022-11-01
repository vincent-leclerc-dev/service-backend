import { Module } from '@nestjs/common';

import DatabaseModule from 'apps/providers/database/database.module';
import GlobalConfigModule from 'apps/config/global.config.module';
import QueueModule from 'apps/providers/queue/queue.module';

import ConsumerModule from './consumers/notifications.module';

import AppController from './app.controller';
import AppService from './app.service';

@Module({
  imports: [
    DatabaseModule,
    GlobalConfigModule,
    QueueModule,
    ConsumerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule {}
