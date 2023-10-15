import { Module } from '@nestjs/common';
import { UsecaseProxyModule } from './infrastructures/usecase-proxy/usecase-proxy.module';
import { UserModule } from './presentations/user/user.module';
import { EnvironmentConfigModule } from './infrastructures/config/environment-config/environment-config.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponsesInterceptor } from './applications/responses/responses.interceptor';

@Module({
  imports: [UsecaseProxyModule.register(), UserModule, EnvironmentConfigModule],
  providers: [{ provide: APP_INTERCEPTOR, useClass: ResponsesInterceptor }],
})
export class AppModule {}
