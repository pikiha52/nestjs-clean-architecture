import { Types } from 'mongoose';
import { UserM } from 'src/domains/model/user';
import { UserRepository } from 'src/domains/repositories/user.repository';

export class ShowUserUseCases {
  constructor(private userRepository: UserRepository) {}

  async execute(id: Types.ObjectId): Promise<UserM> {
    return await this.userRepository.showUser(id);
  }
}
