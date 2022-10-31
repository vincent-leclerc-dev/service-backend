/* eslint-disable class-methods-use-this */
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export default class EventsService {
  private readonly logger = new Logger(EventsService.name);

  constructor(
    @InjectQueue('notifications-queue') private notificationsQueue: Queue,
  ) {
  }

  async sendEvent(payload: any): Promise<any> {
    this.logger.log('sending event');
    this.notificationsQueue.add(payload);
    return { message: 'event sent' };
  }
}
