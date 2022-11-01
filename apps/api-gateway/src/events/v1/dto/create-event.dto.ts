import { Type } from 'class-transformer';
import { Types } from 'mongoose';

import {
  ArrayNotEmpty,
  IsNotEmpty, ValidateNested,
} from 'class-validator';

import {
  ApiProperty,
} from '@nestjs/swagger';

import ConsentDto from '../../../../../common/dtos/consent-dto';

export default class CreateEventDto {
  @ApiProperty({
    example: '635e9a284e76ef5042aedc1c',
  })
  @Type(() => Types.ObjectId)
  @IsNotEmpty()
    user: string;

  @ApiProperty({
    isArray: true,
    type: ConsentDto,
  })
  @ValidateNested({ each: true })
  @Type(() => ConsentDto)
  @ArrayNotEmpty()
    consents: ConsentDto[];
}
