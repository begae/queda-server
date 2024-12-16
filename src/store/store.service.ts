import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/entity/profile.entity';
import { Store } from 'src/entity/store.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async findTaggedStores(profile_id: string, tags: string) {
    const { location } = await this.profileRepository.findOneBy({
      id: profile_id,
    });

    const stores = await this.storeRepository
      .createQueryBuilder('store')
      .innerJoin('store.tags', 'tag')
      .where('tag.id IN (:...tags)', { tags })
      .andWhere(
        `ST_DWithin(
          store.location,
          ST_SetSRID(ST_MakePoint(:lng, :ltd), 4326),
          3000
        )`,
        { lng: location.coordinates[0], ltd: location.coordinates[1] },
      )
      .getMany();

    return stores;
  }
}
