import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entity/user.enum';
import { User } from 'src/entity/user.entity';
import { ProfileService } from 'src/profile/profile.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly profileService: ProfileService,
  ) {}

  async findAll(page: number, size: number) {
    return this.userRepository.find({ skip: (page - 1) * size, take: size });
  }

  async findOneById(id: string) {
    return await this.userRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async isAdmin(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    return user.role === Role.Admin;
  }

  async isManager(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    return user.role === Role.Store;
  }
}
