import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { CreateUserDTO } from '../../../dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(dto: CreateUserDTO): Promise<User> {
    // const user = new User();
    // user.firstName = dto.firstName;
    // user.lastName = dto.lastName;
    // return this.usersRepository.save(user);
    return null;
  }
}
