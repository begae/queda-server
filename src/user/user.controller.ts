import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateProfileReqDto, FindUserReqDto } from './dto/req.dto';
import { PagingReqDto } from 'src/common/dto/req.dto';
import {
  ApiGetItemsResponse,
  ApiGetResponse,
} from 'src/common/decorator/swagger.decorator';
import { FindUserResDto } from './dto/res.dto';
import { PagingResDto } from 'src/common/dto/res.dto';
import { Role } from '../entity/user.enum';
import { Roles } from 'src/common/decorator/role.decorator';

@ApiTags('User')
@ApiExtraModels(FindUserReqDto, FindUserResDto, PagingReqDto, PagingResDto)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('profile/create')
  async createProfile(@Body() userData: CreateProfileReqDto) {
    const profileId = await this.userService.createProfile(userData);
    return profileId;
  }

  @ApiBearerAuth()
  @ApiGetItemsResponse(FindUserResDto)
  @Roles(Role.Admin)
  @Get('all')
  async findAll(
    @Query() { page, size }: PagingReqDto,
  ): Promise<FindUserResDto[]> {
    const users = await this.userService.findAll(page, size);
    return users.map(({ id, email, createdAt }) => {
      return { id, email, createdAt: createdAt.toISOString() };
    });
  }

  @ApiBearerAuth()
  @ApiGetResponse(FindUserResDto)
  @Get(':id')
  async findOne(@Param() { id }: FindUserReqDto) {
    const user = await this.userService.findOneById(id);
    return user;
  }
}
