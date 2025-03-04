import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Food, FoodSchema } from '../../schemas/food.schema';
import { FoodController } from './controllers/food.controller';
import { FoodService } from './services/food.service';
import { Accompaniment, AccompanimentSchema } from 'src/schemas/accompaniment.schema';
import { Carbohydrate, CarbohydrateSchema } from 'src/schemas/carbohydrate.schema';
import { Protein, ProteinSchema } from 'src/schemas/protein.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Food.name, schema: FoodSchema },
    { name: Carbohydrate.name, schema: CarbohydrateSchema },
    { name: Protein.name, schema: ProteinSchema },
    { name: Accompaniment.name, schema: AccompanimentSchema },
  ])],
  controllers: [FoodController],
  providers: [FoodService],
  exports: [FoodService, MongooseModule]
})
export class FoodModule {}
