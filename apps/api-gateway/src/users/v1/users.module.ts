import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import UsersService from './users.service';
import UsersController from './users.controller';
import { User, userEntity } from '../entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: userEntity },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export default class UsersModule {}
