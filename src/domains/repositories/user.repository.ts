import { CreateUserDto } from 'src/presentations/user/dto/create.dto';
import { UserM } from '../model/user';
import { Types } from 'mongoose';
import { UpdateUserDto } from 'src/presentations/user/dto/update.dto';

export interface UserRepository {
  getAllUsers(): Promise<UserM[]>;
  createUser(createDto: CreateUserDto): Promise<any>;
  showUser(id: Types.ObjectId): Promise<UserM>;
  updateUser(id: Types.ObjectId, updateDto: UpdateUserDto): Promise<UserM>;
  deleteUser(id: Types.ObjectId): Promise<Types.ObjectId>;
}
