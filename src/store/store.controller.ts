import { Body, Controller, Post } from '@nestjs/common';
import { StoreService } from './store.service';
import { FindStoreReqDto } from './dto/req.dto';

@Controller('stores')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post('tagged')
  async findTaggedStores(@Body() { profile_id, tags }: FindStoreReqDto) {
    const stores = await this.storeService.findTaggedStores(profile_id, tags);
    return stores;
  }
}
