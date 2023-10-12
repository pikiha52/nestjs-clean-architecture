import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { CreateUserUserUseCases } from 'src/applications/use-cases/user-create.usecase';
import { GetAllUserUseCases } from 'src/applications/use-cases/user.usecase';
import { UseCaseProxy } from 'src/infrastructures/usecase-proxy/usecase-proxy';
import { UsecaseProxyModule } from 'src/infrastructures/usecase-proxy/usecase-proxy.module';
import { CreateUserDto } from './dto/create.dto';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UsecaseProxyModule.GET_ALL_USERS_USE_CASE)
    private readonly getUserUseCaseProxy: UseCaseProxy<GetAllUserUseCases>,
    @Inject(UsecaseProxyModule.CREATE_ONE_USER_USE_CASE)
    private readonly createUserUseCaseProxy: UseCaseProxy<CreateUserUserUseCases>,
  ) {}

  @Get('')
  async getAllUsers() {
    const results = await this.getUserUseCaseProxy.getInstance().execute();
    return {
      status: 'OK',
      code: HttpStatus.OK,
      message: 'Success',
      data: results,
    };
  }

  @Post('')
  async createUser(@Body() createDto: CreateUserDto) {
    const results = await this.createUserUseCaseProxy
      .getInstance()
      .execute(createDto);
    return {
      status: 'CREATE',
      code: HttpStatus.CREATED,
      message: 'Success',
      data: results,
    };
  }
}
