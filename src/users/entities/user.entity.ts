/* eslint-disable @typescript-eslint/indent */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class User {
  @Prop({ unique: true })
  email: string;

  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop({ immutable: true })
  created_at: Date;

  @Prop()
  updated_at: Date;
}

export const userEntity = SchemaFactory.createForClass(User);
