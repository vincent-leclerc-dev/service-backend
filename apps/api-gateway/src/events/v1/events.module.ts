import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import EventsService from './events.service';
import EventsController from './events.controller';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'notifications-queue',
      redis: {
        host: process.env.SERVICE_REDIS_HOST || '0.0.0.0',
        port: parseInt(process.env.SERVICE_REDIS_PORT, 10) || 6379,
      },
    }),
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export default class EventsModule {}
