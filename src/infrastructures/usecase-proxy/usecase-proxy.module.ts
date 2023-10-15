import { DynamicModule, Module } from '@nestjs/common';
import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { RepositoriesModule } from '../repositories/repositories.module';
import { UserRepositoryOrm } from '../repositories/user.repositories';
import { GetAllUserUseCases } from 'src/applications/use-cases/user.usecase';
import { UseCaseProxy } from './usecase-proxy';
import { CreateUserUserUseCases } from 'src/applications/use-cases/user-create.usecase';
import { ShowUserUseCases } from 'src/applications/use-cases/user-show.usecase';
import { UpdateUserUseCase } from 'src/applications/use-cases/update.usecase';
import { DeleteUserUseCases } from 'src/applications/use-cases/delete-user.usecase';

@Module({
  imports: [EnvironmentConfigModule, RepositoriesModule],
})
export class UsecaseProxyModule {
  static GET_ALL_USERS_USE_CASE = 'getAllUsersUsecaseProxy';
  static CREATE_ONE_USER_USE_CASE = 'createOneUserUseCaseProxy';
  static SHOW_USER_USE_CASE = 'showUserUseCaseProxy';
  static UPDATE_USER_USE_CASE = 'updateUserUseCaseProxy';
  static DELETE_USER_USE_CASE = 'deleteUserUseCaseProxy';

  static register(): DynamicModule {
    return {
      module: UsecaseProxyModule,
      providers: [
        {
          inject: [UserRepositoryOrm],
          provide: UsecaseProxyModule.GET_ALL_USERS_USE_CASE,
          useFactory: (userRepository: UserRepositoryOrm) =>
            new UseCaseProxy(new GetAllUserUseCases(userRepository)),
        },
        {
          inject: [UserRepositoryOrm],
          provide: UsecaseProxyModule.CREATE_ONE_USER_USE_CASE,
          useFactory: (userRepository: UserRepositoryOrm) =>
            new UseCaseProxy(new CreateUserUserUseCases(userRepository)),
        },
        {
          inject: [UserRepositoryOrm],
          provide: UsecaseProxyModule.SHOW_USER_USE_CASE,
          useFactory: (userRepository: UserRepositoryOrm) =>
            new UseCaseProxy(new ShowUserUseCases(userRepository)),
        },
        {
          inject: [UserRepositoryOrm],
          provide: UsecaseProxyModule.UPDATE_USER_USE_CASE,
          useFactory: (userRepository: UserRepositoryOrm) =>
            new UseCaseProxy(new UpdateUserUseCase(userRepository)),
        },
        {
          inject: [UserRepositoryOrm],
          provide: UsecaseProxyModule.DELETE_USER_USE_CASE,
          useFactory: (userRepository: UserRepositoryOrm) =>
            new UseCaseProxy(new DeleteUserUseCases(userRepository)),
        },
      ],
      exports: [
        UsecaseProxyModule.GET_ALL_USERS_USE_CASE,
        UsecaseProxyModule.CREATE_ONE_USER_USE_CASE,
        UsecaseProxyModule.SHOW_USER_USE_CASE,
        UsecaseProxyModule.UPDATE_USER_USE_CASE,
        UsecaseProxyModule.DELETE_USER_USE_CASE,
      ],
    };
  }
}
