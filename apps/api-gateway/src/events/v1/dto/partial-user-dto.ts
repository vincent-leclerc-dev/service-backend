import { Type } from 'class-transformer';

import {
  ApiProperty,
} from '@nestjs/swagger';

import { Types } from 'mongoose';

export default class PartialUserDto {
  @ApiProperty({
    example: '635e9a284e76ef5042aedc1c',
  })
  @Type(() => Types.ObjectId)
    id: string;
}
