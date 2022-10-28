/* eslint-disable @typescript-eslint/indent */
import {
  IsNotEmpty, IsOptional, IsString,
} from 'class-validator';

export default class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    firstname: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    lastname: string;

    /*
    @IsArray()
    @IsNotEmpty()
    @IsOptional()
    events: [Event];
    */
}
