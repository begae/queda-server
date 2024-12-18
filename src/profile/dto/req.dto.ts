import {
  IsObject,
  IsString,
  IsUrl,
  IsUUID,
  Matches,
  ValidateNested,
} from 'class-validator';
import { LocationDto } from 'src/common/dto/req.dto';

export class FindProfileReqDto {
  @IsUUID()
  id: string;

  @IsString()
  handle: string;
}

export class CreateProfileReqDto {
  @IsUUID()
  userId: string;

  @Matches(/^[a-z0-9_]{5,20}$/, {
    message:
      'Handle must contain only lowercase letters, numbers and underbars with length of 5 to 20.',
  })
  handle: string;

  @IsUrl()
  profilePicture: string;

  @ValidateNested()
  @IsObject()
  location: LocationDto;
}
