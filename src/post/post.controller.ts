import { Controller, Get, Param } from '@nestjs/common';
import { PostService } from './post.service';
import { PagingReqDto } from 'src/common/dto/req.dto';
import { FindPostResDto, mapPostToResDto } from './dto/res.dto';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { PagingResDto } from 'src/common/dto/res.dto';
import { FindPostReqDto } from './dto/req.dto';
import { ProfileService } from 'src/profile/profile.service';

@ApiTags('Post')
@ApiExtraModels(FindPostReqDto, FindPostResDto, PagingReqDto, PagingResDto)
@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly profileService: ProfileService,
  ) {}

  @Get(':id')
  async findOneById(@Param() { id }: FindPostReqDto): Promise<FindPostResDto> {
    const post = await this.postService.findOneById(id);
    return mapPostToResDto(post);
  }
}
