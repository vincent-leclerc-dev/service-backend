import { Injectable, Logger } from '@nestjs/common';
import { Queue, Job } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export default class EventsService {
  private readonly logger = new Logger(EventsService.name);

  constructor(
    @InjectQueue(process.env.EVENTS_QUEUE) private eventQueue: Queue,
  ) {}

  async sendEvent(payload: any): Promise<Job<any>> {
    this.logger.debug(`sending to ${process.env.EVENTS_QUEUE}`);
    return this.eventQueue.add(payload);
  }
}
