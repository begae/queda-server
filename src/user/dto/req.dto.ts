import { ApiProperty } from '@nestjs/swagger';
import {
  Equals,
  IsArray,
  IsObject,
  IsUrl,
  IsUUID,
  MaxLength,
  ValidateNested,
} from 'class-validator';

export class FindUserReqDto {
  @ApiProperty({ required: true })
  @IsUUID()
  id: string;
}

class LocationDto {
  @Equals('Point')
  type: 'Point';

  @IsArray()
  coordinates: [number, number];
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
