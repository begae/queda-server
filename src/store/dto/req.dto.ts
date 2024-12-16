import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class FindStoreReqDto {
  @ApiProperty({ required: true })
  @IsUUID()
  profile_id: string;

  tags: string;
}
