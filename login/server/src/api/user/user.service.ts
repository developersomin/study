import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findOneByEmail({ email }) {
    return this.userRepository.findOne({ where: { email } });
  }

  async create({ email, password, name, age }) {
    const user = await this.findOneByEmail({ email });
    if (user) {
      throw new ConflictException('이미 등록된 이메일입니다');
    }
    const hashPassword = await bcrypt.hash(password, 10);

    return this.userRepository.save({
      email,
      password: hashPassword,
      name,
      age,
    });
  }
}
