import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { IUserService, USER_SERVICE } from '@services/user.service';
import { UserCreatedResponse } from '@dtos/response/user-created.response';
import { CreateUserRequest } from '../request/create-user.request';
import { BaseResponse } from '../response/base.response';
import { PaginateRequest } from '../request/paging.query';
import { UsersPaging } from '@dtos/result/users.result';

@Controller('/users')
export class UserController {
  constructor(
    @Inject(USER_SERVICE)
    private readonly userService: IUserService,
  ) {}

  @Get()
  async getHello(@Query() query: PaginateRequest): Promise<UsersPaging> {
    return await this.userService.getAll(query);
  }

  @Post()
  async create(
    @Body() request: CreateUserRequest,
  ): Promise<BaseResponse<UserCreatedResponse>> {
    return {
      status: 200,
      data: await this.userService.create({
        firstName: request.firstName,
        lastName: request.lastName,
      }),
    };
  }
}
