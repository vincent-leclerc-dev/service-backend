/* eslint-disable @typescript-eslint/indent */
import {
  IsNotEmpty, IsString, IsOptional, IsArray,
} from 'class-validator';

export default class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsArray()
    @IsNotEmpty()
    @IsOptional()
    consents: [];
}
