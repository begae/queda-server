import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entity/user.enum';
import { User } from 'src/entity/user.entity';
import { Geometry } from 'src/entity/geometry.interface';
import { Profile } from 'src/entity/profile.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
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

  async createProfile(userData: {
    userId: string;
    nickname: string;
    profilePicture: string;
    location: Geometry;
  }) {
    const profile = this.profileRepository.create(userData);
    await this.profileRepository.save(profile);
    const user = await this.userRepository.findOneBy({ id: userData.userId });
    user.profile = profile;
    await this.userRepository.save(user);
    return profile.id;
  }
}
