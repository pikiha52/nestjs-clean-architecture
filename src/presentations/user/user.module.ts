import { Module } from '@nestjs/common';
import { UsecaseProxyModule } from '../../infrastructures/usecase-proxy/usecase-proxy.module';
import { UserController } from './user.controller';

@Module({
  imports: [UsecaseProxyModule.register()],
  controllers: [UserController],
})
export class UserModule {}
