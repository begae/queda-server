import {
  IsArray,
  IsNumber,
  IsObject,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { LocationDto } from 'src/common/dto/req.dto';

export class FindStoreReqDto {
  @ValidateNested()
  @IsObject()
  userLocation: LocationDto;

  @IsArray()
  @IsUUID('4', { each: true })
  tags: string[];

  @IsNumber()
  @Min(1)
  radius: number;
}
