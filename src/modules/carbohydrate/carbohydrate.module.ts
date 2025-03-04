import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Carbohydrate, CarbohydrateSchema } from '../../schemas/carbohydrate.schema';
import { CarbohydrateService } from './carbohydrate.service';
import { CarbohydrateController } from './carbohydrate.controller';
import { FoodModule } from '../food/food.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Carbohydrate.name, schema: CarbohydrateSchema }]),
    FoodModule 
  ],
  controllers: [CarbohydrateController],
  providers: [CarbohydrateService],
  exports: [CarbohydrateService] 
})
export class CarbohydrateModule {}
