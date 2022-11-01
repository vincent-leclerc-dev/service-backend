/* eslint-disable no-underscore-dangle */
import { Job } from 'bull';
import { Model, Types } from 'mongoose';
import Promise from 'bluebird';
import _ from 'lodash';

import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  Event, EventDocument,
  User, UserDocument,
} from 'apps/models';
import ConsentDto from 'apps/common/dtos/consent-dto';

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
    this.logger.debug('start process notification');

    const data = { ...job.data };
    this.logger.debug(data);

    const userId = new Types.ObjectId(job.data.user.toString());

    const user = await this.userModel.findOne({ _id: userId });

    const mergeConsents = _.merge(_.keyBy(user.consents, 'id'), _.keyBy(data.consents, 'id'));

    // update user
    await this.userModel.updateOne(
      { _id: userId },
      {
        $set: {
          consents: _.map(mergeConsents, (it) => it),
        },
      },
      { lean: true, new: true },
    );

    // create events history
    await Promise.map(data.consents, async (consent: ConsentDto) => {
      await this.eventModel.create({
        user: data.user._id,
        id: consent.id,
        enabled: consent.enabled,
      });
    });

    this.logger.debug('end process notification');
  }
}
