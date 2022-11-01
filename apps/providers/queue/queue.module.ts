import { BullModule } from '@nestjs/bull';
import { Global, Module } from '@nestjs/common';

const eventQueue = BullModule.registerQueue({
  name: process.env.EVENTS_QUEUE,
  redis: {
    host: process.env.SERVICE_REDIS_HOST || '0.0.0.0',
    port: parseInt(process.env.SERVICE_REDIS_PORT, 10) || 6379,
  },
});

@Global()
@Module({
  imports: [
    eventQueue,
  ],
  exports: [
    eventQueue,
  ],
})
export default class QueueModule {}
