import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Transform } from 'class-transformer';

export type EventDocument = Event & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Event {
  @Transform(({ value }) => value.toString())
    _id: ObjectId;

  /*
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  enabled: boolean;

  @Prop({ type: s.Types.ObjectId, ref: 'User', index: true })
  user: s.Types.ObjectId;
  */

  @Prop({ immutable: true })
    created_at: Date;

  @Prop()
    updated_at: Date;
}

export const eventEntity = SchemaFactory.createForClass(Event);
