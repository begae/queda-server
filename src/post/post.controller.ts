import { Controller, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { PagingReqDto } from 'src/common/dto/req.dto';
import { FindPostResDto } from './dto/res.dto';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { PagingResDto } from 'src/common/dto/res.dto';
import { FindPostReqDto } from './dto/req.dto';

@ApiTags('Post')
@ApiExtraModels(FindPostReqDto, FindPostResDto, PagingReqDto, PagingResDto)
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  async findEachEveryLatest(@Query() { page, size }: PagingReqDto) {
    const posts = await this.postService.findEachEveryLatest(page, size);
    return posts;
  }

  async findLatestFromTaggedStores() {}

  async findTaggedRelevance() {}

  async findOneById() {}
}
