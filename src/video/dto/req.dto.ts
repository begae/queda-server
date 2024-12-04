import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class CreateVideoReqDto {
  @ApiProperty({ required: true })
  @MinLength(5)
  @MaxLength(100)
  @IsString()
  title: string;

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  video: any;
}

export class FindVideoReqDto {
  @ApiProperty({ required: true })
  @IsUUID()
  id: string;
}
