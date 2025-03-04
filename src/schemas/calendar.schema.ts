import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Calendar extends Document {
  @Prop({
    required: true,
    enum: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
  })
  dayOfWeek: string;

  @Prop({ required: true })
  forDate: Date;

  @Prop({ type: [Types.ObjectId], ref: 'Menu' })
  optionsMenu: Types.ObjectId[];
}

export const CalendarSchema = SchemaFactory.createForClass(Calendar);
