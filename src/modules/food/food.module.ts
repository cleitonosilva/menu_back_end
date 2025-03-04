import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Food, FoodSchema } from '../../schemas/food.schema';
import { FoodController } from './controllers/food.controller';
import { FoodService } from './services/food.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Food.name, schema: FoodSchema }])],
  controllers: [FoodController],
  providers: [FoodService],
  exports: [FoodService, MongooseModule]
})
export class FoodModule {}
