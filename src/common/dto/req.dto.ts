import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Equals, IsArray, IsInt } from 'class-validator';

export class PagingReqDto {
  @ApiPropertyOptional({ description: 'page number, default = 1' })
  @Transform((param) => Number(param.value))
  @IsInt()
  page?: number = 1;

  @ApiPropertyOptional({ description: 'data count per page, default = 20' })
  @Transform((param) => Number(param.value))
  @IsInt()
  size?: number = 20;
}

export class LocationDto {
  @Equals('Point')
  type: 'Point';

  @IsArray()
  coordinates: [number, number];
}
