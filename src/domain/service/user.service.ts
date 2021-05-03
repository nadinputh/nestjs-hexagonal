import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from 'eventemitter2';
import { HOME } from 'src/constant/event-name.constant';
import { HomeEvent } from '../../application/event/home.event';

@Injectable()
export class UserService {
  constructor(private readonly eventEmitter: EventEmitter2) {}
  getHello(): string {
    const event = new HomeEvent();
    event.greeting = 'Hello World!';
    this.eventEmitter.emit(HOME, event);

    return event.greeting;
  }
}
