import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsJSON, IsNotEmpty, IsNumberString, IsOptional, IsPhoneNumber, IsString } from "class-validator";


export class AddProviderDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name : string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly providerType: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly servicesOffered: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly registrationNumber: string;  

  @ApiProperty()
  @IsNotEmpty()
  @IsJSON()
  readonly address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly country: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumberString()
  readonly landline?: string;

  @ApiProperty()
  // @IsNotEmpty()
  @IsPhoneNumber()
  readonly mobileNumber: string;

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

  @ApiProperty()
  @IsString()
  readonly adminUserName: string;

  @ApiProperty()
  @IsEmail()
  readonly adminUserEmail: string;

  @ApiProperty()
  @IsPhoneNumber()
  @IsString()
  readonly adminUserMobileNumber: string;

  @ApiProperty()
  @IsString()
  readonly adminUserPassword: string;

  @ApiProperty()
  @IsString()
  readonly adminUserCountry: string;

  @ApiProperty()
  @IsString()
  readonly subscriptionPlan: string;

  @ApiProperty()
  @IsString()
  readonly subscriptionValidity: string;

  @ApiProperty()
  @IsDateString()
  @IsString()
  readonly subscriptionStartDate: string;

  @ApiProperty()
  @IsDateString()
  @IsString()
  readonly subscriptionEndDate: string;

  @ApiProperty()
  @IsString()
  readonly subscriptionPaymentStatus: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsJSON()
  readonly availableTimings?: string;
}