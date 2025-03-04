import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Carbohydrate, CarbohydrateSchema } from '../../schemas/carbohydrate.schema';
import { FoodModule } from '../food/food.module';
import { CarbohydrateController } from './controllers/carbohydrate.controller';
import { CarbohydrateService } from './services/carbohydrate.service';

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
