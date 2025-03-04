import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Food, FoodSchema } from './food.schema';

@Schema()
export class Protein extends Document {
  @Prop({ type: FoodSchema, required: true })
  food: Food;

  @Prop({ required: true })
  tablespoon: number;

  @Prop({ required: true })
  grams: number;
}

export const ProteinSchema = SchemaFactory.createForClass(Protein);
