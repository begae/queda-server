import { ApiProperty } from '@nestjs/swagger';
import {
  IsObject,
  IsUrl,
  IsUUID,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { LocationDto } from 'src/common/dto/req.dto';

export class FindUserReqDto {
  @ApiProperty({ required: true })
  @IsUUID()
  id: string;
}

export class CreateProfileReqDto {
  @IsUUID()
  userId: string;

  @MaxLength(20)
  nickname: string;

  @IsUrl()
  profilePicture: string;

  @ValidateNested()
  @IsObject()
  location: LocationDto;
}
