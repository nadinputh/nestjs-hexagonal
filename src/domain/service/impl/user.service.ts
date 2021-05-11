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

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private userRepository: IUserRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  getAll({ size, page }): Promise<UsersPaging> {
    return this.userRepository.getAll({ size, page });
  }

  create(dto: CreateUserCommand): Promise<UserResponse> {
    return this.userRepository.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
    });
  }

  getHello(): string {
    const event = new HomeEvent();
    event.greeting = 'Hello World!';
    this.eventEmitter.emit(HOME, event);

    return event.greeting;
  }
}
