import { Module } from '@nestjs/common';
import { IOModule } from '@infrastructure/io/io.module';
import { ConfigsModule } from './_config/configs.module';

@Module({
  imports: [ConfigsModule, IOModule],
  exports: [IOModule],
})
export class InfrastructureModule {}
