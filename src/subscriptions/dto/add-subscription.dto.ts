import {
  IsString,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddSubscriptionDto {
  @ApiProperty()
  @IsString()
  readonly plan: string;

  @ApiProperty()
  @IsString()
  readonly validity: string;

  @ApiProperty()
  @IsDateString()
  readonly startDate: string;

  @ApiProperty()
  @IsDateString()
  readonly endDate: string;

  @ApiProperty()
  @IsString()
  readonly paymentStatus: string;
}