import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";



export class GetAllProvidersDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly providerId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly providerType?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly state?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly pincode?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly landline?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly mobileNumber?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly user?: string;

}