import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsJSON } from 'class-validator';

export class AddRoleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly key: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsJSON()
  readonly permissions: string;
}
