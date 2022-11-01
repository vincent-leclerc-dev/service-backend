import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsNotEmpty, ValidateNested,
} from 'class-validator';

import {
  ApiProperty,
} from '@nestjs/swagger';

import PartialUserDto from './partial-user-dto';
import ConsentDto from '../../../../../common/dtos/consent-dto';

export default class CreateEventDto {
  @ApiProperty()
  @Type(() => PartialUserDto)
  @IsNotEmpty()
    user: PartialUserDto;

  @ApiProperty({
    isArray: true,
    type: ConsentDto,
  })
  @ValidateNested({ each: true })
  @Type(() => ConsentDto)
  @ArrayNotEmpty()
    consents: ConsentDto[];
}
