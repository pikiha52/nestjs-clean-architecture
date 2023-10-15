import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../../domains/repositories/user.repository';
import { User } from '../entities/user.entity';
import { MongoRepository } from 'typeorm';
import { UserM } from '../../domains/model/user';
import { CreateUserDto } from 'src/presentations/user/dto/create.dto';
import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';
import { UpdateUserDto } from 'src/presentations/user/dto/update.dto';

@Injectable()
export class UserRepositoryOrm implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
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

  async showUser(id: Types.ObjectId): Promise<UserM> {
    const cursor = this.userRepository.aggregate([
      {
        $match: { _id: new ObjectId(id) },
      },
    ]);

    const response = await cursor.next();
    return response;
  }

  async updateUser(id: Types.ObjectId, updateDto: UpdateUserDto): Promise<any> {
    const cursor = await this.userRepository.findOneAndReplace(
      { _id: id },
      updateDto,
      { returnDocument: 'after' },
    );
    return cursor;
  }

  async deleteUser(id: Types.ObjectId): Promise<Types.ObjectId> {
    const cursor = await this.userRepository.findOneAndDelete({ _id: id }, {});
    return cursor?.value?._id;
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
