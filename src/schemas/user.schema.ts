import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Menu' })
  menuId: Types.ObjectId;

  @Prop({ required: true })
  phone: number;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
