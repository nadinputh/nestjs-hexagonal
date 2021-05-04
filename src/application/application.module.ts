import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { HomeListener } from './listener/home.listener';
import { DomainModule } from '../domain/domain.module';

@Module({
  imports: [DomainModule],
  controllers: [UserController],
  providers: [HomeListener],
})
export class ApplicationModule {}
