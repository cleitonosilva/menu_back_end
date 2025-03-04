import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Carbohydrate, CarbohydrateSchema } from '../../schemas/carbohydrate.schema';
import { CarbohydrateService } from './services/carbohydrate.service';
import { CarbohydrateController } from './controllers/carbohydrate.controller';
import { FoodModule } from '../food/food.module';
import { Food, FoodSchema } from '../../schemas/food.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Carbohydrate.name, schema: CarbohydrateSchema },
      { name: Food.name, schema: FoodSchema }
    ]),
    FoodModule 
  ],
  controllers: [CarbohydrateController],
  providers: [CarbohydrateService],
  exports: [CarbohydrateService]
})
export class CarbohydrateModule {}
