import { Controller, Get } from '@nestjs/common';
import { UserService } from '../../domain/service/user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }
}
