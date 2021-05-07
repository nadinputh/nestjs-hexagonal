import { Controller, Get } from '@nestjs/common';
import { UserService } from '../../domain/service/user.service';
import { Permissions } from '../decorator/permissions.decorator';
import { Roles } from '../decorator/roles.decorator';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles('admin', 'employee')
  @Permissions('home')
  getHello(): string {
    return this.userService.getHello();
  }
}
