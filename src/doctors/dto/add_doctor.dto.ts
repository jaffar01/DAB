import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class AddDoctorDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly category:string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly education:string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly registrationNumber:string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly about?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly experience?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly awardsAchievements?: string;

  @ApiProperty()
  @IsJSON()
  readonly doctorVariants: string;

  @ApiProperty()
  @IsJSON()
  readonly Tax: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly photo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsJSON()
  readonly availableTimings?: string;

  @ApiProperty()
  @IsString()
  readonly doctorName: string;

  @ApiProperty()
  @IsEmail()
  readonly doctorEmail: string;

  @ApiProperty()
  @IsPhoneNumber()
  @IsString()
  readonly doctorMobileNumber: string;

  @ApiProperty()
  @IsString()
  readonly doctorPassword: string;

  @ApiProperty()
  @IsString()
  readonly doctorCountry: string;



}