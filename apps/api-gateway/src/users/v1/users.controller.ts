import {
  Body, Controller, Delete, Get, Param, Post, Query, HttpCode,
} from '@nestjs/common';

import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import UsersService from './users.service';
import CreateUserDto from './dto/create-user.dto';
import userToJSON from './views/user.json';
import QueryParamsUserDto from './dto/query-params-user.dto';

@ApiTags('users')
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
    const user = await this.usersService.findOne(id);
    return userToJSON(user);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    await this.usersService.remove(id);
  }
}
