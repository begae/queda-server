import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/entity/profile.entity';
import { Store } from 'src/entity/store.entity';
import { UserService } from 'src/user/user.service';
import { DataSource, Repository } from 'typeorm';
import { CreateProfileReqDto } from './dto/req.dto';

@Injectable()
export class ProfileService {
  constructor(
    private dataSource: DataSource,
    private userService: UserService,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async validateHandle(handle: string) {
    const profile = await this.profileRepository.findOneBy({ handle });
    if (profile) throw new ConflictException('Handle already registered');
    return true;
  }

  async createProfile(data: CreateProfileReqDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    let error: Error;
    try {
      const existingHandle = await this.profileRepository.findOneBy({
        handle: data.handle,
      });
      if (existingHandle)
        throw new ConflictException('Handle already registered');
      const profile = queryRunner.manager.create(Profile, {
        handle: data.handle,
        profilePicture: data.profilePicture,
        location: data.location,
      });
      await queryRunner.manager.save(profile);
      const user = await this.userService.findOneById(data.userId);
      user.profile = profile;
      await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();
      return profile;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      error = e;
    } finally {
      await queryRunner.release();
      if (error) throw error;
    }
  }

  async findFollowingStoresByHandle(handle: string): Promise<Store[]> {
    const profile = await this.profileRepository.findOne({
      where: { handle },
      relations: ['favorites'],
    });
    return profile.favorites;
  }
}
