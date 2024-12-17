import { Body, Controller, Post } from '@nestjs/common';
import { StoreService } from './store.service';
import { FindStoreReqDto } from './dto/req.dto';
import { Store } from 'src/entity/store.entity';
import { StoreListItemDto } from './dto/res.dto';

@Controller('stores')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post('tagged')
  async findTaggedStores(
    @Body() { userLocation, tags, radius }: FindStoreReqDto,
  ): Promise<StoreListItemDto[]> {
    const stores = await this.storeService.findFilteredStoresWithLatestPost(
      userLocation,
      tags,
      radius,
    );
    return stores.map(this.mapStoreToResponseDto);
  }

  private mapStoreToResponseDto(store: Store): StoreListItemDto {
    return {
      id: store.id,
      name: store.name,
      profilePicture: store.profilePicture,
      location: store.location,
      latestPostId: store.latestPost.id,
      latestPostTitle: store.latestPost.title,
      latestPostCreatedAt: store.latestPost.createdAt.toISOString(),
    };
  }
}
