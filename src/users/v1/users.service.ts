/* eslint-disable class-methods-use-this */
import MailChecker from 'mailchecker';
import { FilterQuery, Model, Types } from 'mongoose';
import { Injectable, Logger, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import ExceptionMessages from '@/constants/exception-messages';
import QueryParamsUserDto from '@/users/v1/dto/query-params-user.dto';
import CreateUserDto from './dto/create-user.dto';
import ObjectValidationFailedException from '../../errors/object-validation-failed.exception';

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

    if (!MailChecker.isValid(body.email)) {
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
  }

  async findOne(id: string): Promise<User> {
    this.logger.log(`getting user ${id}`);

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
    this.logger.log(`deleting user ${id}`);

    if (!Types.ObjectId.isValid(id)) {
      throw new ObjectValidationFailedException(
        ExceptionMessages.MONGO_ID_NOT_VALID_MESSAGE,
      );
    }

    await this.userModel.deleteOne({ _id: id });
  }
}
