import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule],
  providers: [UserService],
})
export class DomainModule {}
