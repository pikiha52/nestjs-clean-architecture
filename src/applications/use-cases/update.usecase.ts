import { Types } from 'mongoose';
import { UserM } from 'src/domains/model/user';
import { UserRepository } from 'src/domains/repositories/user.repository';
import { UpdateUserDto } from 'src/presentations/user/dto/update.dto';

export class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: Types.ObjectId, updateDto: UpdateUserDto): Promise<UserM> {
    const updateUser: UpdateUserDto = {
      email: updateDto.email,
      name: updateDto.name,
      password: updateDto.password,
    };

    return this.userRepository.updateUser(id, updateUser);
  }
}
