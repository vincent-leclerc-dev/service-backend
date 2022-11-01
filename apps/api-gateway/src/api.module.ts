import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import AllExceptionsFilter from '../../common/errors/all-exceptions.filter';
import DatabaseModule from '../../providers/database/database.module';
import GlobalConfigModule from 'apps/config/global.config.module';

import UsersModule from './users/v1/users.module';
import EventsModule from './events/v1/events.module';

import ApiController from './api.controller';
import ApiService from './api.service';

@Module({
  imports: [
    GlobalConfigModule,
    DatabaseModule,
    UsersModule,
    EventsModule,
  ],
  controllers: [ApiController],
  providers: [
    ApiService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})

export default class ApiModule {}
