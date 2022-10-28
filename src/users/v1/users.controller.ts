import {
  Body, Controller, Delete, Get, Param, Post, Query, HttpCode,
} from '@nestjs/common';

import UsersService from './users.service';
import CreateUserDto from './dto/create-user.dto';
import userToJSON from './views/user.json';
import QueryParamsUserDto from './dto/query-params-user.dto';

@Controller({
  path: 'users',
  version: '1',
})
export default class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return userToJSON(await this.usersService.create(createUserDto));
  }

  @Get()
  async findAll(@Query() queryParams: QueryParamsUserDto) {
    const users = await this.usersService.findAll(queryParams);
    return users
      .map((user) => userToJSON(user));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return userToJSON(await this.usersService.findOne(id));
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    await this.usersService.remove(id);
  }
}
