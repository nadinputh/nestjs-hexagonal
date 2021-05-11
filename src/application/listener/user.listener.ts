import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  UserCreatedEvent,
  USER_CREATED,
} from '@application/event/user-created.event';

@Injectable()
export class UserListener {
  private readonly logger: Logger = new Logger('UserListener');
  @OnEvent(USER_CREATED)
  handleHomeEvent(event: UserCreatedEvent) {
    this.logger.log(JSON.stringify(event));
  }
}
