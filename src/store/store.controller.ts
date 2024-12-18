import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StoreService } from './store.service';
import { FindStoreReqDto } from './dto/req.dto';
import {
  FindStoreResDto,
  mapStoreToListItemDto,
  mapStoreToResDto,
  StoreListItemDto,
} from './dto/res.dto';

@Controller('stores')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get(':id')
  async findOneById(
    @Param() { id }: FindStoreReqDto,
  ): Promise<FindStoreResDto> {
    const store = await this.storeService.findOneById(id);
    return mapStoreToResDto(store);
  }

  @Post('browse')
  async findTaggedStores(
    @Body() { userLocation, tags, radius }: FindStoreReqDto,
  ): Promise<StoreListItemDto[]> {
    const stores = await this.storeService.findFilteredStoresWithLatestPost(
      userLocation,
      tags,
      radius,
    );
    return stores.map(mapStoreToListItemDto);
  }
}
