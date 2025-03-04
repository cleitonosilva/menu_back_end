import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Carbohydrate, CarbohydrateSchema } from '../../schemas/carbohydrate.schema';
import { Protein, ProteinSchema } from '../../schemas/protein.schema';
import { Accompaniment, AccompanimentSchema } from '../../schemas/accompaniment.schema';
import { Medicines, MedicinesSchema } from '../../schemas/medicines.schema';
import { Food, FoodSchema } from '../../schemas/food.schema';
import { CarbohydrateService } from './services/carbohydrate.service';
import { CarbohydrateController } from './controllers/carbohydrate.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Carbohydrate.name, schema: CarbohydrateSchema },
      { name: Protein.name, schema: ProteinSchema }, 
      { name: Accompaniment.name, schema: AccompanimentSchema }, 
      { name: Medicines.name, schema: MedicinesSchema }, 
      { name: Food.name, schema: FoodSchema } 
    ])
  ],
  controllers: [CarbohydrateController],
  providers: [CarbohydrateService],
  exports: [CarbohydrateService]
})
export class CarbohydrateModule {}
