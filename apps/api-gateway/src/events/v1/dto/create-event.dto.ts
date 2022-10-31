/* eslint-disable @typescript-eslint/indent */
// import { Prop } from '@nestjs/mongoose';
import {
  IsNotEmpty, IsEnum, IsMongoId, IsString, IsBoolean,
} from 'class-validator';

import { NotificationType } from '../../../models/notifications/entity';

export default class CreateUserDto {
    @IsEnum(NotificationType)
    @IsNotEmpty()
    id: NotificationType;

    @IsBoolean()
    @IsNotEmpty()
    enabled: boolean;

    @IsString()
    @IsMongoId()
    @IsNotEmpty()
    // @Prop({ type: [{ type: Types.ObjectId, ref: User.name }] })
    user: string/* User | Types.ObjectId */;
}
