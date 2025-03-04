import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Accompaniment, AccompanimentSchema } from '../../schemas/accompaniment.schema';
import { Food, FoodSchema } from '../../schemas/food.schema'; 
import { AccompanimentService } from './services/accompaniment.service';
import { AccompanimentController } from './controllers/accompaniment.controller';
import { FoodModule } from '../food/food.module';
import { Carbohydrate, CarbohydrateSchema } from 'src/schemas/carbohydrate.schema';
import { Medicines, MedicinesSchema } from 'src/schemas/medicines.schema';
import { Protein, ProteinSchema } from 'src/schemas/protein.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
        { name: Accompaniment.name, schema: AccompanimentSchema },
        { name: Food.name, schema: FoodSchema },
        { name: Carbohydrate.name, schema: CarbohydrateSchema },
        { name: Protein.name, schema: ProteinSchema },
        { name: Medicines.name, schema: MedicinesSchema },
    ]),
    FoodModule 
  ],
  controllers: [AccompanimentController],
  providers: [AccompanimentService],
  exports: [AccompanimentService]
})
export class AccompanimentModule {}
