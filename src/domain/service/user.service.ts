import { CreateUserCommand } from '@dtos/command/create-user.command';
import { UsersCommand } from '@dtos/command/users.command';
import { UserResponse } from '@dtos/response/user.response';
import { UsersPaging } from '@dtos/response/users.response';

export const USER_SERVICE = 'USER_SERVICE';

export interface IUserService {
  getAll(dto: UsersCommand): Promise<UsersPaging>;
  create(dto: CreateUserCommand): Promise<UserResponse>;
}
