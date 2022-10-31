import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
// import validate from '@/config/env.validate';
// import config from '@/config';
import DatabaseModule from './providers/database/database.module';

import UsersModule from './users/v1/users.module';
import EventsModule from './events/v1/events.module';
import AllExceptionsFilter from './errors/all-exceptions.filter';
import AppController from './api.controller';
import AppService from './api.service';
import GlobalConfigModule from './config/global.config.module';

if (process.env.DEBUG === 'true') {
  mongoose.set('debug', true);
}

@Module({
  imports: [
    GlobalConfigModule,
    DatabaseModule,
    UsersModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})

export default class AppModule {}
