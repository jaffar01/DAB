import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";


export class AuthenticationDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly email?:string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly mobileNumber?:string;

  @ApiPropertyOptional()
  @IsOptional()
  readonly password?:string;
  
}