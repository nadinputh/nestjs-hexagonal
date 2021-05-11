import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { IUserService, USER_SERVICE } from '@services/user.service';
import { UserCreatedResponse } from '@dtos/response/user-created.response';
import { CreateUserRequest } from '../request/create-user.request';
import { PaginateRequest } from '../request/paging.query';
import { UsersPaging } from '@dtos/result/users.result';

@Controller('/users')
export class UserController {
  constructor(
    @Inject(USER_SERVICE)
    private readonly userService: IUserService,
  ) {}

  @Get()
  async index(@Query() query: PaginateRequest): Promise<UsersPaging> {
    return this.userService.getAll(query);
  }

  @Post()
  async create(
    @Body() request: CreateUserRequest,
  ): Promise<UserCreatedResponse> {
    return {
      user: await this.userService.create({
        firstName: request.firstName,
        lastName: request.lastName,
      }),
    };
  }
}
