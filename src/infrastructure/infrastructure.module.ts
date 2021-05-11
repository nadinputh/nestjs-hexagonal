import { Module } from '@nestjs/common';
import { USERS_REPOSITORY } from '@adapters/repository/user.repository';
import { DatabaseModule } from '@infrastructure/database.module';
import { UsersRepository } from '@infrastructure/io/repository/user.repository';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: USERS_REPOSITORY,
      useClass: UsersRepository,
    },
  ],
  exports: [
    {
      provide: USERS_REPOSITORY,
      useClass: UsersRepository,
    },
  ],
})
export class InfrastructureModule {}
