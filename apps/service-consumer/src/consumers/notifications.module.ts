import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import QueueModule from 'apps/providers/queue/queue.module';
import {
  Event, eventEntity,
  User, userEntity,
} from 'apps/models';

import NotificationsProcessor from './notifications.processor';

@Module({
  imports: [
    QueueModule,
    MongooseModule.forFeature([
      { name: Event.name, schema: eventEntity },
    ]),
    MongooseModule.forFeature([
      { name: User.name, schema: userEntity },
    ]),
  ],
  providers: [NotificationsProcessor],
})
export default class NotificationsModule {}
