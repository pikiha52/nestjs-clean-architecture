import { CreateUserDto } from 'src/presentations/user/dto/create.dto';
import { UserM } from '../model/user';

export interface UserRepository {
  getAllUsers(): Promise<UserM[]>;
  createUser(createDto: CreateUserDto): Promise<any>;
}
