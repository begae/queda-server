import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/entity/profile.entity';
import { Store } from 'src/entity/store.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async findFollowingStoresByHandle(handle: string): Promise<Store[]> {
    const profile = await this.profileRepository.findOne({
      where: { handle },
      relations: ['favorites'],
    });
    return profile.favorites;
  }
}
