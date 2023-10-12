import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../../domains/repositories/user.repository';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserM } from '../../domains/model/user';
import { CreateUserDto } from 'src/presentations/user/dto/create.dto';

@Injectable()
export class UserRepositoryOrm implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<UserM[]> {
    const users = await this.userRepository.find();
    return users.map((user) => this.toUser(user));
  }

  async createUser(createDto: CreateUserDto): Promise<any> {
    const user: UserM = new UserM();
    user.name = createDto.name;
    user.email = createDto.email;
    user.password = createDto.password;
    return this.userRepository.save(user);
  }

  private toUser(userEntity: User): UserM {
    const user: UserM = new UserM();

    user.id = userEntity.id;
    user.email = userEntity.email;
    user.name = userEntity.name;
    user.password = userEntity.password;
    user.created_at = userEntity.created_at;
    user.updated_at = userEntity.updated_at;

    return user;
  }
}
