import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { PagingReqDto } from 'src/common/dto/req.dto';
import { FindPostResDto } from './dto/res.dto';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { PagingResDto } from 'src/common/dto/res.dto';
import { FindPostReqDto } from './dto/req.dto';
import { Post as PostEntity } from 'src/entity/post.entity';

@ApiTags('Post')
@ApiExtraModels(FindPostReqDto, FindPostResDto, PagingReqDto, PagingResDto)
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(':id')
  async findOneById(@Param() { id }: FindPostReqDto): Promise<FindPostResDto> {
    const post = await this.postService.findOneById(id);
    return this.mapPostToResponseDto(post);
  }

  @Post('following')
  async findFollowingEveryLatest(
    @Body() { following }: FindPostReqDto,
  ): Promise<FindPostResDto[]> {
    const posts = await this.postService.findFollowingEveryLatest(following);
    return posts.map(this.mapPostToResponseDto);
  }

  private mapPostToResponseDto(post: PostEntity): FindPostResDto {
    return {
      id: post.id,
      title: post.title,
      body: post.body,
      attachments: post.attachments ?? [],
      likes: post.likedUsers.length,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
      storeId: post.publishedBy.id,
      storeName: post.publishedBy.name,
      storeProfilePicture: post.publishedBy.profilePicture,
    };
  }
}
