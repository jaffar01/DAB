import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsJSON,
  IsOptional,
} from 'class-validator';

export class AddUserDTO {
  @ApiPropertyOptional()
  @IsOptional()
  // @IsNotEmpty()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  // @IsNotEmpty()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  // @IsNotEmpty()
  @IsPhoneNumber()
  mobileNumber?: string;

  @ApiPropertyOptional()
  @IsOptional()
  // @IsNotEmpty()
  @IsString()
  password?: string;

  @ApiPropertyOptional()
  @IsOptional()
  // @IsNotEmpty()
  @IsString()
  country?: string;

  @IsNotEmpty()
  @IsJSON()
  roles: string;

  @ApiPropertyOptional()
  @IsOptional()
  // @IsNotEmpty()
  @IsString()
  providerId?: string;
}
