import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  keepConnectionAlive: true,
  type: process.env.DB_DRIVER || 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  database: process.env.DB_DATABASE || 'test',
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  entities: ['dist/**/**/*.entity{.ts,.js}'],
  synchronize: true,
}));
