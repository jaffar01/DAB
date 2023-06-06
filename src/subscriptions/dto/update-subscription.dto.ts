import {
  IsString,
  IsEmail,
  IsJSON,
  IsNumberString,
  IsOptional,
  IsPhoneNumber,
  IsNotEmpty,
  IsArray,
  IsDateString,
} from 'class-validator';
import { ApiPropertyOptional, ApiProperty} from '@nestjs/swagger';

export class UpdateSubscriptionDto {
  // @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  // readonly subscriptionId:string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly plan?:string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly validity?:string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  readonly startDate?:string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  readonly endDate?:string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly paymentStatus?:string;
}