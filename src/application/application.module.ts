import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { HomeListener } from './listener/home.listener';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [HomeListener],
})
export class ApplicationModule {}
