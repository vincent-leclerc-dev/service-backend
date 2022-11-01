/* eslint-disable no-underscore-dangle */
import MailChecker from 'mailchecker';
import { FilterQuery, Model, Types } from 'mongoose';
import { Injectable, Logger, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import ExceptionMessages from 'apps/common/constants/exception-messages';
import ObjectValidationFailedException from 'apps/common/errors/object-validation-failed.exception';
import {
  User,
  UserDocument,
} from 'apps/models/user.entity';

import EventsService from '../../events/v1/events.service';
import CreateEventDto from '../../events/v1/dto/create-event.dto';

import CreateUserDto from './dto/create-user.dto';
import QueryParamsUserDto from './dto/query-params-user.dto';

const MONGO_DUPLICATE_ERROR_CODE = 11000;

@Injectable()
export default class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private readonly eventsService: EventsService,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {
  }

  async create(body: CreateUserDto): Promise<User> {
    this.logger.debug('creating new user');

    if (!MailChecker.isValid(body.email) || !this.findByEmail(body.email)) {
      throw new UnprocessableEntityException();
    }

    try {
      const newUser = await this.userModel.create(body);

      // generate consent change history
      if (body?.consents) {
        const createEventPayload: CreateEventDto = {
          user: {
            id: newUser._id,
          },
          consents: body.consents,
        };
        this.eventsService.sendEvent(createEventPayload);
      }

      return await newUser.toObject();
    } catch (e) {
      if (e.code === MONGO_DUPLICATE_ERROR_CODE) {
        throw new UnprocessableEntityException();
      }

      throw e;
    }
  }

  async findByEmail(email :string): Promise<User> {
    this.logger.debug('finding user by email');

    const user = await this.userModel.findOne(
      { email },
      null,
      { lean: true },
    );

    return user;
  }

  async findAll(queryParams: QueryParamsUserDto): Promise<User[]> {
    this.logger.debug('listing users');

    const filters: FilterQuery<UserDocument> = {};

    return this.userModel
      .find(
        filters,
        null,
        {
          lean: true,
          sort: { _id: -1 },
          skip: queryParams?.skip ?? 0,
          limit: queryParams?.limit ?? 10,
        },
      );
  }

  async findOne(id: string): Promise<User> {
    this.logger.debug(`getting user ${id}`);

    if (!Types.ObjectId.isValid(id)) {
      throw new ObjectValidationFailedException(
        ExceptionMessages.MONGO_ID_NOT_VALID_MESSAGE,
      );
    }

    const user = await this.userModel.findOne(
      { _id: id },
      null,
      { lean: true },
    );

    if (!user) {
      throw new ObjectValidationFailedException(
        `${ExceptionMessages.USER_NOT_FOUND_MESSAGE} ${id}`,
      );
    }

    return user;
  }

  async remove(id: string): Promise<void> {
    this.logger.debug(`deleting user ${id}`);

    if (!Types.ObjectId.isValid(id)) {
      throw new ObjectValidationFailedException(
        ExceptionMessages.MONGO_ID_NOT_VALID_MESSAGE,
      );
    }

    await this.userModel.deleteOne({ _id: id });
  }
}
