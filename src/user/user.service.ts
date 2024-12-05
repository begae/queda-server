import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entity/user.enum';
import { User } from 'src/entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAll(page: number, size: number) {
    return this.userRepository.find({ skip: (page - 1) * size, take: size });
  }

  async findOne(id: string) {
    return 'find user';
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    return user;
  }

  async isAdmin(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    return user.role === Role.Admin;
  }

  async createBulk() {
    for (let i = 1; i <= 10000; i++) {
      await this.userRepository.save(
        this.userRepository.create({
          email: `someone${i}@somewhere.com`,
          password: 'sOmepasswor1d^^',
        }),
      );
    }
  }
}
