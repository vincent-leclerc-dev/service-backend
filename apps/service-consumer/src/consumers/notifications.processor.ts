import { Job } from 'bull';
import { Process, Processor } from '@nestjs/bull';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Logger } from '@nestjs/common';

import {
  Event,
  EventDocument,
} from '../entities/event.entity';

@Processor('notifications-queue')
export default class NotificationsProcessor {
  private readonly logger = new Logger(NotificationsProcessor.name);

  constructor(
    @InjectModel(Event.name)
    private eventModel: Model<EventDocument>,
  ) {
  }

  @Process()
  async processNotification(job: Job) {
    this.logger.log('start process notification');
    this.logger.debug(job.data);

    const createBody = { ...job.data };
    createBody.user = new Types.ObjectId(job.data.user.toString());
    await this.eventModel.create(createBody);

    this.logger.log('end process notification');
  }
}
