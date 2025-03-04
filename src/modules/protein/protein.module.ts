import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Protein, ProteinSchema } from '../../schemas/protein.schema';
import { ProteinController } from './controllers/protein.controller';
import { ProteinService } from './services/protein.service';
import { FoodModule } from '../food/food.module';

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
