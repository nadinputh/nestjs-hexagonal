import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from 'eventemitter2';
import { HOME } from 'src/constant/event-name.constant';
import { HomeEvent } from '../../application/event/home.event';
import { UsersRepository } from '../../infrastructure/io/repository/user.repository';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UsersRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  getHello(): string {
    const event = new HomeEvent();
    event.greeting = 'Hello World!';
    this.eventEmitter.emit(HOME, event);

    this.userRepository.create({
      firstName: 'Nadin',
      lastName: 'POUTH',
    });

    return event.greeting;
  }
}
