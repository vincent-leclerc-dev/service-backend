import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId /* , Schema as s */ } from 'mongoose';
import { Transform } from 'class-transformer';
// import { Event } from '../../events/entities/event.entity';

export type UserDocument = User & Document;
@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class User {
  @Transform(({ value }) => value.toString())
    _id: ObjectId;

  @Prop({ unique: true, required: true })
    email: string;

  @Prop()
    consents: object[];

  @Prop({ immutable: true })
    created_at: Date;

  @Prop()
    updated_at: Date;
}

export const userEntity = SchemaFactory.createForClass(User);
