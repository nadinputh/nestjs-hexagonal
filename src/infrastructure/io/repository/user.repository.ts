import { Injectable } from '@nestjs/common';
import { User } from '@entities/user.entity';
import { CreateUserCommand } from '@dtos/command/create-user.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserRepository } from '@adapters/repository/user.repository';
import { UsersPaging } from '@dtos/result/users.result';
import { UserResponse } from '@dtos/response/user.response';
import { UsersCommand } from '@dtos/command/users.command';

@Injectable()
export class UsersRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAll({ size = 10, page = 1 }: UsersCommand): Promise<UsersPaging> {
    const [users, total] = await this.usersRepository
      .findAndCount({
        order: {
          id: 'DESC',
        },
        skip: size * (page - 1),
        take: size * 1,
      })
      .then(([users, total]) => [
        users.map((user) => ({
          uuid: user.uuid,
          firstName: user.firstName,
          lastName: user.lastName,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        })),
        total,
      ]);

    return {
      users: {
        users,
        page: page * 1,
        size: size * 1,
        total,
      },
    };
  }

  create(dto: CreateUserCommand): Promise<UserResponse> {
    const user = new User();
    user.firstName = dto.firstName;
    user.lastName = dto.lastName;

    return this.usersRepository.save(user).then((user) => ({
      uuid: user.uuid,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
  }
}
