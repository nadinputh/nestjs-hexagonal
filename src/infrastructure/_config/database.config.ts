import { User } from '@infrastructure/io/entity/user.entity';
import { registerAs } from '@nestjs/config';

export default (name: string) =>
  registerAs(name, () => ({
    type: process.env.DB_DRIVER || 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    database: process.env.DB_DATABASE || 'test',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    logging: process.env.DB_LOGGING || false,
    useUTC: true,
    entities: [],
  }));

export const entities = [User];
