import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { FindPostResDto, mapPostToResDto } from 'src/post/dto/res.dto';
import { PostService } from 'src/post/post.service';
import { mapStoreToListItemDto, StoreListItemDto } from 'src/store/dto/res.dto';
import { CreateProfileReqDto } from './dto/req.dto';
import { FindProfileResDto } from './dto/res.dto';

@Controller('')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly postService: PostService,
  ) {}

  @Post('profile/create')
  async createProfile(
    @Body() data: CreateProfileReqDto,
  ): Promise<FindProfileResDto> {
    const profile = await this.profileService.createProfile(data);
    return profile;
  }

  @Get(':handle/following')
  async findFollowingStores(
    @Param() handle: string,
  ): Promise<StoreListItemDto[]> {
    const stores =
      await this.profileService.findFollowingStoresByHandle(handle);
    return stores.map(mapStoreToListItemDto);
  }

  @Get(':handle/feed')
  async findFollowingEveryLatest(
    @Param() handle: string,
  ): Promise<FindPostResDto[]> {
    const stores =
      await this.profileService.findFollowingStoresByHandle(handle);
    const posts = await this.postService.findFollowingEveryLatest(
      stores.map(({ id }) => id),
    );
    return posts.map(mapPostToResDto);
  }
}
