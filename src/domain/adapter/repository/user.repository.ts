import { CreateUserCommand } from '@dtos/command/create-user.command';
import { UsersQuery } from '@dtos/query/users.query';
import { UserCreatedResponse } from '@dtos/response/user-created.response';
import { UsersPaging } from '@dtos/result/users.result';

export const USERS_REPOSITORY = 'USERS_REPOSITORY';

export interface IUserRepository {
  getAll(query: UsersQuery): Promise<UsersPaging>;
  create(dto: CreateUserCommand): Promise<UserCreatedResponse>;
}
