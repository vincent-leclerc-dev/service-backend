import { Job } from 'bull';
import { Model, Types } from 'mongoose';

import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  Event, EventDocument,
  User, UserDocument,
} from '../../../models';

@Processor(process.env.EVENTS_QUEUE)
export default class NotificationsProcessor {
  private readonly logger = new Logger(NotificationsProcessor.name);

  constructor(
    @InjectModel(Event.name)
    private eventModel: Model<EventDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
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
