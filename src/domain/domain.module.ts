import { Module } from '@nestjs/common';
import { UserService } from '@services/impl/user.service';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { USER_SERVICE } from '@services/user.service';

@Module({
  imports: [InfrastructureModule],
  providers: [
    {
      provide: USER_SERVICE,
      useClass: UserService,
    },
  ],
  exports: [
    {
      provide: USER_SERVICE,
      useClass: UserService,
    },
  ],
})
export class DomainModule {}
