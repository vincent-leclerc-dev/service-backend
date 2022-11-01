import {
  Body, Controller, Delete, Get, Param, Post, Query, HttpStatus, HttpCode,
} from '@nestjs/common';
import {
  ApiResponse, ApiTags, ApiOperation,
} from '@nestjs/swagger';

import CreateUserDto from './dto/create-user.dto';
import QueryParamsUserDto from './dto/query-params-user.dto';

import UsersService from './users.service';

import userToJSON from './views/user.json';

@ApiTags('users')
@Controller({
  path: '/v1/users',
})
export default class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The user has been successfully created.' })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY, description: 'Unprocessable Entity' })
  async create(@Body() createUserDto: CreateUserDto) {
    return userToJSON(await this.usersService.create(createUserDto));
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List users' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The user has been successfully listed.' })
  async findAll(@Query() queryParams: QueryParamsUserDto) {
    const users = await this.usersService.findAll(queryParams);
    return users
      .map((user) => userToJSON(user));
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The user was found.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'The user was not found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request.' })
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    return userToJSON(user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'The user has been successfully deleted.' })
  async remove(@Param('id') id: string) {
    await this.usersService.remove(id);
  }
}
