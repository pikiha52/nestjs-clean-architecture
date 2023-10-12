import { UserRepository } from 'src/domains/repositories/user.repository';
import { CreateUserDto } from 'src/presentations/user/dto/create.dto';

export class CreateUserUserUseCases {
  constructor(private usersRepository: UserRepository) {}

  async execute(createDto: CreateUserDto): Promise<any> {
    return await this.usersRepository.createUser(createDto);
  }
}
