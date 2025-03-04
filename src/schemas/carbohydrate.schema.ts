import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Food, FoodSchema } from './food.schema';

@Schema()
export class Carbohydrate extends Document {
  @Prop({ type: FoodSchema, required: true })
  food: Food;

  @Prop({ required: true })
  tablespoon: number;

  @Prop({ required: true })
  grams: number;
}

export const CarbohydrateSchema = SchemaFactory.createForClass(Carbohydrate);
