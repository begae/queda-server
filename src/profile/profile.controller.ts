import { Controller, Get, Param } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { FindPostResDto, mapPostToResponseDto } from 'src/post/dto/res.dto';
import { PostService } from 'src/post/post.service';

@Controller('')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly postService: PostService,
  ) {}

  @Get(':handle/following')
  async findFollowingEveryLatest(
    @Param() handle: string,
  ): Promise<FindPostResDto[]> {
    const stores =
      await this.profileService.findFollowingStoresByHandle(handle);
    const posts = await this.postService.findFollowingEveryLatest(
      stores.map(({ id }) => id),
    );
    return posts.map(mapPostToResponseDto);
  }
}
