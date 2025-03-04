import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Protein, ProteinSchema } from '../../schemas/protein.schema';
import { Food, FoodSchema } from '../../schemas/food.schema'; 
import { ProteinService } from './services/protein.service';
import { ProteinController } from './controllers/protein.controller';
import { FoodModule } from '../food/food.module';
import { Carbohydrate, CarbohydrateSchema } from 'src/schemas/carbohydrate.schema';
import { Accompaniment, AccompanimentSchema } from 'src/schemas/accompaniment.schema';
import { Medicines, MedicinesSchema } from 'src/schemas/medicines.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Protein.name, schema: ProteinSchema },
      { name: Food.name, schema: FoodSchema },
      { name: Accompaniment.name, schema: AccompanimentSchema }, 
      { name: Medicines.name, schema: MedicinesSchema },
      { name: Carbohydrate.name, schema: CarbohydrateSchema },
    ]),
    FoodModule 
  ],
  controllers: [ProteinController],
  providers: [ProteinService],
  exports: [ProteinService]
})
export class ProteinModule {}
