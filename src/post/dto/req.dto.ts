import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class FindPostReqDto {
  @ApiProperty({ required: true })
  @IsUUID()
  id: string;
}