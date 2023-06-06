import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class TokenBlockListDTO {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  readonly token: string;
}