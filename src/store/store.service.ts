import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Geometry } from 'src/entity/geometry.interface';
import { Store } from 'src/entity/store.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}

  async findFilteredStoresWithLatestPost(
    userLocation: Geometry,
    tags: string[],
    radius: number,
  ) {
    const stores = await this.storeRepository
      .createQueryBuilder('store')
      .leftJoinAndSelect('store.latestPost', 'latestPost')
      .innerJoin('store.tags', 'tag')
      .where('tag.id IN (:...tags)', { tags })
      .andWhere(`ST_DWithin(store.location, :userLocation, :radius)`, {
        userLocation,
        radius,
      })
      .getMany();

    return stores;
  }
}
