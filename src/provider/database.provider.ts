import { ConfigService } from '@nestjs/config';
import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (config: ConfigService) =>
      await createConnection(config.get('database')),
    inject: [ConfigService],
  },
];
