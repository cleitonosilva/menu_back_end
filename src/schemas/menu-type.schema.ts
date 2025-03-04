import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class MenuType extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, default: 0 })
  proteinQuantity: number;

  @Prop({ required: true, default: 0 })
  carbohydrateQuantity: number;

  @Prop({ required: true, default: 0 })
  accompanimentQuantity: number;
}

export const MenuTypeSchema = SchemaFactory.createForClass(MenuType);
