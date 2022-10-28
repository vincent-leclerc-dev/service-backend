import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import UsersModule from './users/v1/users.module';
import AllExceptionsFilter from './errors/all-exceptions.filter';
import AppController from './app.controller';
import AppService from './app.service';
import validate from './config/env.validate';
import config from './config';

if (process.env.DEBUG === 'true') {
  mongoose.set('debug', true);
}

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      validate,
      cache: true,
      isGlobal: true,
      load: [config],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => (configService.get<object>('db')),
      inject: [ConfigService],
    }),
    UsersModule,
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
