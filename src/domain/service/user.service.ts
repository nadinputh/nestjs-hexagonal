import { CreateUserCommand } from '@dtos/command/create-user.command';
import { UserCreatedResponse } from '@dtos/response/user-created.response';
import { UsersPaging } from '@dtos/response/users.response';

export const USER_SERVICE = 'USER_SERVICE';

export interface IUserService {
  getHello(): string;
  getAll({ size, page }): Promise<UsersPaging>;
  create(dto: CreateUserCommand): Promise<UserCreatedResponse>;
}
