import { Connection, Repository } from 'typeorm';
import { User } from '../infrastructure/io/entity/user.entity';

export const photoProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: ['DATABASE_CONNECTION'],
  },
];
