import { Types } from 'mongoose';
import { UserRepository } from 'src/domains/repositories/user.repository';

export class DeleteUserUseCases {
  constructor(private userRepository: UserRepository) {}

  async execute(id: Types.ObjectId): Promise<Types.ObjectId> {
    return this.userRepository.deleteUser(id);
  }
}
