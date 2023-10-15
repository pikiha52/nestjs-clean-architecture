import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserUserUseCases } from '../..//applications/use-cases/user-create.usecase';
import { GetAllUserUseCases } from '../../applications/use-cases/user.usecase';
import { UseCaseProxy } from '../../infrastructures/usecase-proxy/usecase-proxy';
import { UsecaseProxyModule } from '../../infrastructures/usecase-proxy/usecase-proxy.module';
import { CreateUserDto } from './dto/create.dto';
import { ShowUserUseCases } from '../../applications/use-cases/user-show.usecase';
import { ObjectIdTransformPipe } from '../../applications/transform/objectId.transform.pipe';
import { Types } from 'mongoose';
import { UpdateUserDto } from './dto/update.dto';
import { UpdateUserUseCase } from 'src/applications/use-cases/update.usecase';
import { DeleteUserUseCases } from 'src/applications/use-cases/delete-user.usecase';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UsecaseProxyModule.GET_ALL_USERS_USE_CASE)
    private readonly getUserUseCaseProxy: UseCaseProxy<GetAllUserUseCases>,
    @Inject(UsecaseProxyModule.CREATE_ONE_USER_USE_CASE)
    private readonly createUserUseCaseProxy: UseCaseProxy<CreateUserUserUseCases>,
    @Inject(UsecaseProxyModule.SHOW_USER_USE_CASE)
    private readonly shoUserUseCaseProxy: UseCaseProxy<ShowUserUseCases>,
    @Inject(UsecaseProxyModule.UPDATE_USER_USE_CASE)
    private readonly updateUserUseCaseProxy: UseCaseProxy<UpdateUserUseCase>,
    @Inject(UsecaseProxyModule.DELETE_USER_USE_CASE)
    private readonly deleteUserUseCaseProxy: UseCaseProxy<DeleteUserUseCases>,
  ) {}

  @Get('')
  async getAllUsers() {
    return await this.getUserUseCaseProxy.getInstance().execute();
  }

  @Post('')
  async createUser(@Body() createDto: CreateUserDto) {
    return await this.createUserUseCaseProxy.getInstance().execute(createDto);
  }

  @Get(':id')
  async showUser(@Param('id', ObjectIdTransformPipe) id: Types.ObjectId) {
    return await this.shoUserUseCaseProxy.getInstance().execute(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id', ObjectIdTransformPipe) id: Types.ObjectId,
    @Body() updateDto: UpdateUserDto,
  ) {
    return await this.updateUserUseCaseProxy
      .getInstance()
      .execute(id, updateDto);
  }

  @Delete(':id')
  async deleteUser(
    @Param('id', ObjectIdTransformPipe) id: Types.ObjectId,
  ): Promise<Types.ObjectId> {
    return await this.deleteUserUseCaseProxy.getInstance().execute(id);
  }
}
