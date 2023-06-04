import {
  IsString,
  IsEmail,
  IsJSON,
  IsNumberString,
  IsOptional,
  IsPhoneNumber,
  IsArray,
  IsDateString,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class updateProviderDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly providerType?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly servicesOffered: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly registrationNumber: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsJSON()
  readonly address?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly country?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumberString()
  readonly landline?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsPhoneNumber()
  readonly mobileNumber?: string;

  @ApiPropertyOptional()
  @IsOptional()
  readonly photos?: [string];


  @ApiPropertyOptional()
  @IsOptional()
  readonly documents?: [string];

  @ApiPropertyOptional()
  @IsOptional()
  @IsJSON()
  readonly commissions?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsJSON()
  readonly accountDetails?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly subscriptionId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly subscriptionPlan?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly subscriptionValidity?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  readonly subscriptionStartDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  readonly subscriptionEndDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly subscriptionPaymentStatus?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsJSON()
  readonly availableTimings?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsJSON()
  readonly users?: string;
}
