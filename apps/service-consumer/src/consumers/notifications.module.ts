import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import NotificationsProcessor from './notifications.processor';
import { Event, eventEntity } from '../entities/event.entity';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'notifications-queue',
    }),
    MongooseModule.forFeature([
      { name: Event.name, schema: eventEntity },
    ]),
  ],
  providers: [NotificationsProcessor],
})
export default class NotificationsModule {}
