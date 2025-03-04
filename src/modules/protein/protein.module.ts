import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Protein, ProteinSchema } from '../../schemas/protein.schema';
import { ProteinService } from './protein.service';
import { FoodModule } from '../food/food.module';
import { ProteinController } from './protein.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Protein.name, schema: ProteinSchema }]),
    FoodModule
  ],
  controllers: [ProteinController],
  providers: [ProteinService],
  exports: [ProteinService]
})
export class ProteinModule {}
