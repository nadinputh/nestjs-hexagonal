import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { HomeEvent } from '../event/home.event';
import { HOME } from '../../constant/event-name.constant';

@Injectable()
export class HomeListener {
  private readonly logger: Logger = new Logger('HomeListener');
  @OnEvent(HOME)
  handleHomeEvent(event: HomeEvent) {
    this.logger.log(JSON.stringify(event));
  }
}
