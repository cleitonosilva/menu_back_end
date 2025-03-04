import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Food extends Document {
  @Prop({ required: true })
  name: string;
}

export const FoodSchema = SchemaFactory.createForClass(Food);
