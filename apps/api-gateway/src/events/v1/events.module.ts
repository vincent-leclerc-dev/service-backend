import { Module } from '@nestjs/common';

import QueueModule from '../../../../providers/queue/queue.module';

import EventsService from './events.service';
import EventsController from './events.controller';

@Module({
  imports: [
    QueueModule,
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export default class EventsModule {}
