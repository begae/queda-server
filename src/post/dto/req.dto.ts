import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsUUID } from 'class-validator';

export class FindPostReqDto {
  @ApiProperty({ required: true })
  @IsUUID()
  id: string;

  @IsArray()
  @IsUUID('4', { each: true })
  following: string[];
}
