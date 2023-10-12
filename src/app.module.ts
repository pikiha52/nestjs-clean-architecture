import { Module } from '@nestjs/common';
import { UsecaseProxyModule } from './infrastructures/usecase-proxy/usecase-proxy.module';
import { UserModule } from './presentations/user/user.module';
import { EnvironmentConfigModule } from './infrastructures/config/environment-config/environment-config.module';

@Module({
  imports: [UsecaseProxyModule.register(), UserModule, EnvironmentConfigModule],
})
export class AppModule {}
