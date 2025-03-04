import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Food } from './food.schema';

@Schema()
export class Accompaniment extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Food', required: true })
  food: Types.ObjectId;

  @Prop({ required: true })
  grams: number;

  @Prop({ required: true })
  tablespoon: number;
}

export const AccompanimentSchema = SchemaFactory.createForClass(Accompaniment);
