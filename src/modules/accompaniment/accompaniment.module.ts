import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Accompaniment, AccompanimentSchema } from '../../schemas/accompaniment.schema';
import { FoodModule } from '../food/food.module';
import { AccompanimentController } from './controllers/accompaniment.controller';
import { AccompanimentService } from './services/accompaniment.service';

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
