/* eslint-disable @typescript-eslint/indent */
import { Type } from 'class-transformer';
import {
  IsNotEmpty, IsString, IsOptional, IsArray, ValidateNested, ArrayNotEmpty,
} from 'class-validator';

import CreateEventDto from '../../../events/v1/dto/create-event.dto';

export default class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => CreateEventDto)
    @IsOptional()
    consents: CreateEventDto[];
}
