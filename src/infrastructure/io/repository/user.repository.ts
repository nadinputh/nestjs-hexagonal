import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { CreateUserDTO } from '../../../dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(dto: CreateUserDTO): Promise<User> {
    const user = new User();
    user.firstName = dto.firstName;
    user.lastName = dto.lastName;

    console.log(user);

    return this.usersRepository.save(user);
  }
}
