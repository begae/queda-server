import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { VideoService } from './video.service';
import { CreateVideoReqDto, FindVideoReqDto } from './dto/req.dto';
import { PagingReqDto } from 'src/common/dto/req.dto';
import {
  ApiGetItemsResponse,
  ApiGetResponse,
  ApiPostResponse,
} from 'src/common/decorator/swagger.decorator';
import { CreateVideoResDto, FindVideoResDto } from './dto/res.dto';
import { PagingResDto } from 'src/common/dto/res.dto';
import { ThrottlerProxyGuard } from 'src/common/guard/throttler-proxy.guard';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

@ApiTags('Video')
@ApiExtraModels(
  FindVideoReqDto,
  FindVideoResDto,
  CreateVideoResDto,
  PagingReqDto,
  PagingResDto,
)
@UseGuards(ThrottlerProxyGuard)
@Controller('api/videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @ApiBearerAuth()
  @ApiPostResponse(CreateVideoResDto)
  @Post('upload')
  upload(@Body() createVideoReqDto: CreateVideoReqDto) {
    return this.videoService.create();
  }

  @ApiBearerAuth()
  @ApiGetItemsResponse(FindVideoResDto)
  @SkipThrottle()
  @Get('all')
  findAll(@Query() { page, size }: PagingReqDto) {
    return this.videoService.findAll();
  }

  @ApiBearerAuth()
  @ApiGetResponse(FindVideoResDto)
  @Get(':id')
  findOne(@Param() { id }: FindVideoReqDto) {
    return this.videoService.findOne(id);
  }

  @ApiBearerAuth()
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Get(':id/download')
  async download(@Param() { id }: FindVideoReqDto) {
    return this.videoService.download(id);
  }
}
