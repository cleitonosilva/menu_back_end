import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Accompaniment, AccompanimentSchema } from '../../schemas/accompaniment.schema';
import { AccompanimentService } from './accompaniment.service';
import { AccompanimentController } from './accompaniment.controller';
import { FoodModule } from '../food/food.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Accompaniment.name, schema: AccompanimentSchema }]),
    FoodModule
  ],
  controllers: [AccompanimentController],
  providers: [AccompanimentService],
  exports: [AccompanimentService]
})
export class AccompanimentModule {}
