import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Medicines, MedicinesSchema } from '../../schemas/medicines.schema';
import { MedicinesController } from './controllers/medicines.controller';
import { MedicinesService } from './services/medicines.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Medicines.name, schema: MedicinesSchema }])
  ],
  controllers: [MedicinesController],
  providers: [MedicinesService],
  exports: [MedicinesService]
})
export class MedicinesModule {}
