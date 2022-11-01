import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import QueueModule from '../../../../providers/queue/queue.module';
import { User, userEntity } from '../../../../models/user.entity';

import EventsService from '../../events/v1/events.service';

import UsersService from './users.service';
import UsersController from './users.controller';

@Module({
  imports: [
    QueueModule,
    MongooseModule.forFeature([
      { name: User.name, schema: userEntity },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, EventsService],
})
export default class UsersModule {}
