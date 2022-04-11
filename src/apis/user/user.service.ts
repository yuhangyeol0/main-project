import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create({ email, hashedPassword: password, name, age }) {
    const result = await this.userRepository.findOne({ email });
    if(result) throw new ConflictException('존재하는 이메일입니다.');
    return await this.userRepository.save({ email, password, name, age });
  }

  async findAll() {
    return await this.userRepository.find({});
  }

  async findOne({ email }) {
    return await this.userRepository.findOne({ email });
  }

  async update({ email, hashedPassword: password, updateUserInput }) {
    const user = await this.userRepository.findOne({ email });
    const newUser = { ...user, ...updateUserInput, password };
    console.log(newUser);
    return await this.userRepository.save(newUser);
  }

  async delete({ email }) {
    const result = await this.userRepository.softDelete({ email });
    return result.affected ? true : false;
  }
}
