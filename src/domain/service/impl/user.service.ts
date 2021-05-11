import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from 'eventemitter2';
import { IUserService } from '@services/user.service';
import { HOME, HomeEvent } from '@application/event/home.event';
import {
  IUserRepository,
  USERS_REPOSITORY,
} from '@adapters/repository/user.repository';
import { CreateUserCommand } from '@dtos/command/create-user.command';
import { UsersPaging } from '@dtos/response/users.response';
import { UserResponse } from '@dtos/response/user.response';
import { UsersCommand } from '@dtos/command/users.command';
import { USER_CREATED } from '@application/event/user-created.event';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private userRepository: IUserRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  getAll({ size, page }: UsersCommand): Promise<UsersPaging> {
    return this.userRepository.getAll({ size, page });
  }

  async create(dto: CreateUserCommand): Promise<UserResponse> {
    const user = await this.userRepository.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
    });
    this.eventEmitter.emit(USER_CREATED, user);
    return user;
  }
}
