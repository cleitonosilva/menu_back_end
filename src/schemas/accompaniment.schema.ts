import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Food, FoodSchema } from './food.schema';

@Schema()
export class Accompaniment extends Document {
  @Prop({ type: FoodSchema, required: true })
  food: Food;

  @Prop({ required: true })
  grams: number;

  @Prop({ required: true })
  tablespoon: number;
}

export const AccompanimentSchema = SchemaFactory.createForClass(Accompaniment);
