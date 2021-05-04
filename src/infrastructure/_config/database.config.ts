import { registerAs } from '@nestjs/config';
import { User } from '../io/entity/user.entity';

export default registerAs('database', () => ({
  type: process.env.DB_DRIVER || 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  database: process.env.DB_DATABASE || 'test',
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  // autoLoadEntities: true,
  // entities: ['**/*.entity{.ts,.js}'],
  entities: [User],
  synchronize: process.env.NODE_ENV != 'production',
}));
