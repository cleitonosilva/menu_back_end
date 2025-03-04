import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Medicines extends Document {
  @Prop({ required: true })
  remedy: string;

  @Prop({ required: true })
  quantity: number;

  @Prop()
  observation: string;
}

export const MedicinesSchema = SchemaFactory.createForClass(Medicines);
