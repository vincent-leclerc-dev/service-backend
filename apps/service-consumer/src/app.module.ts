import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import AppController from './app.controller';
import AppService from './app.service';
import GlobalConfigModule from './config/global.config.module';
import DatabaseModule from './providers/database/database.module';
import ConsumerModule from './consumers/notifications.module';

@Module({
  imports: [
    GlobalConfigModule,
    DatabaseModule,
    BullModule.forRoot({
      redis: {
        host: process.env.SERVICE_REDIS_HOST || '0.0.0.0',
        port: parseInt(process.env.SERVICE_REDIS_PORT, 10) || 6379,
      },
    }),
    ConsumerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule {}
