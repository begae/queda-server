import { Body, Controller, Post } from '@nestjs/common';
import { StoreService } from './store.service';
import { FindStoreReqDto } from './dto/req.dto';

@Controller('stores')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post('tagged')
  async findTaggedStores(
    @Body() { userLocation, tags, radius }: FindStoreReqDto,
  ) {
    return await this.storeService.findFilteredStoresWithLatestPost(
      userLocation,
      tags,
      radius,
    );
  }
}
