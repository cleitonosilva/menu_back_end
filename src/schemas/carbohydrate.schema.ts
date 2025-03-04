import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Food } from './food.schema';

@Schema()
export class Carbohydrate extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Food', required: true })
  food: Types.ObjectId;

  @Prop({ required: true })
  tablespoon: number;

  @Prop({ required: true })
  grams: number;
}

export const CarbohydrateSchema = SchemaFactory.createForClass(Carbohydrate);
