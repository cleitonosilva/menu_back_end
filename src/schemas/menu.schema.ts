import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Carbohydrate, CarbohydrateSchema } from './carbohydrate.schema';
import { Protein, ProteinSchema } from './protein.schema';
import { Accompaniment, AccompanimentSchema } from './accompaniment.schema';
import { Medicines, MedicinesSchema } from './medicines.schema';

@Schema()
export class Menu extends Document {
  @Prop({ required: true, enum: ['breakfast', 'lunch', 'dinner'] })
  menuType: string;

  @Prop({ type: CarbohydrateSchema, required: true })
  carbohydrate: Carbohydrate;

  @Prop({ type: ProteinSchema, required: true })
  protein: Protein;

  @Prop({ type: [AccompanimentSchema], required: true })
  accompanimentPrimary: Accompaniment[];

  @Prop({ type: [MedicinesSchema], required: false, default: [] })
  medicines: Medicines[];
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
