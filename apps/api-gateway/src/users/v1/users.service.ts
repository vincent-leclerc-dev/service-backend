/* eslint-disable class-methods-use-this */
import MailChecker from 'mailchecker';
import { FilterQuery, Model, Types } from 'mongoose';
import { Injectable, Logger, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import ExceptionMessages from '../../constants/exception-messages';
import QueryParamsUserDto from './dto/query-params-user.dto';
import ObjectValidationFailedException from '../../errors/object-validation-failed.exception';

import CreateUserDto from './dto/create-user.dto';

import {
  User,
  UserDocument,
} from '../entities/user.entity';

const MONGO_DUPLICATE_ERROR_CODE = 11000;

@Injectable()
export default class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {
  }

  async create(body: CreateUserDto): Promise<User> {
    this.logger.log('creating new user');

    if (!MailChecker.isValid(body.email) || !this.findByEmail(body.email)) {
      throw new UnprocessableEntityException();
    }
    try {
      const newUser = await this.userModel.create(body);
      return await newUser.toObject();
    } catch (e) {
      if (e.code === MONGO_DUPLICATE_ERROR_CODE) {
        throw new UnprocessableEntityException();
      }

      throw e;
    }
  }

  async findByEmail(email :string): Promise<User> {
    this.logger.log('find by email');

    const user = await this.userModel.findOne(
      { email },
      null,
      { lean: true },
    );

    return user;
  }

  async findAll(queryParams: QueryParamsUserDto): Promise<User[]> {
    const filters: FilterQuery<UserDocument> = {};

    return this.userModel
      .find(
        filters,
        null,
        {
          lean: true, sort: { _id: -1 }, skip: queryParams.skip, limit: queryParams.limit,
        },
      );
    /*

    return this.userModel
      .aggregate([
        { $match: filters },
        { $project: { email: 1, consents: 1 } },
        {
          $lookup: {
            from: 'events',
            localField: '_id',
            foreignField: 'user',
            as: 'consents',
          },
        },
        { $skip: queryParams.skip },
        { $limit: queryParams.limit },
      ]);
      */
  }

  async findOne(id: string): Promise<User> {
    this.logger.log(`getting user ${id}`);

    if (!Types.ObjectId.isValid(id)) {
      throw new ObjectValidationFailedException(
        ExceptionMessages.MONGO_ID_NOT_VALID_MESSAGE,
      );
    }

    const users = await this.userModel
      .aggregate([
        {
          $match: {
            _id: new Types.ObjectId(id),
          },
        },
        {
          $project: {
            // _id: 1,
            email: 1,
            consents: 1,
          },
        },
        {
          $lookup: {
            as: 'consents',
            from: 'events',
            localField: '_id',
            foreignField: 'user',
            let: { user_id: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$user', '$$user_id'],
                  },
                },
              },
              {
                $project: { id: 1, created_at: 1 },
              },
              {
                $limit: 2,
              },
              {
                $sort: { created_at: -1 },
              },
            ],
          },
        },
        {
          $limit: 1,
        },
      ]);

    if (!users) {
      throw new ObjectValidationFailedException(
        `${ExceptionMessages.USER_NOT_FOUND_MESSAGE} ${id}`,
      );
    }

    return users[0];
  }

  async remove(id: string): Promise<void> {
    this.logger.log(`deleting user ${id}`);

    if (!Types.ObjectId.isValid(id)) {
      throw new ObjectValidationFailedException(
        ExceptionMessages.MONGO_ID_NOT_VALID_MESSAGE,
      );
    }

    await this.userModel.deleteOne({ _id: id });
  }
}
