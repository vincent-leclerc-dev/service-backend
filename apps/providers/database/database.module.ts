import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';

if (process.env.DEBUG === 'true') {
  mongoose.set('debug', true);
}

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => (configService.get<object>('db')),
      inject: [ConfigService],
    }),
  ],
})
export default class DatabaseModule {}
