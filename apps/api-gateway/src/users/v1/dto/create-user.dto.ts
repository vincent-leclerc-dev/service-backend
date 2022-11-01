import { Type } from 'class-transformer';
import {
  IsNotEmpty, IsString, ValidateNested, ArrayNotEmpty, IsEmail, IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import ConsentDto from '../../../../../common/dtos/consent-dto';

export default class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsString()
  @IsNotEmpty()
    email: string;

  @ApiProperty({
    isArray: true,
    type: ConsentDto,
  })
  @ValidateNested({ each: true })
  @Type(() => ConsentDto)
  @ArrayNotEmpty()
  @IsOptional()
    consents?: ConsentDto[];
}
