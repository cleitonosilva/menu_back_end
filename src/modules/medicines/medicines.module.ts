import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Medicines, MedicinesSchema } from '../../schemas/medicines.schema';
import { MedicinesService } from './medicines.service';
import { MedicinesController } from './medicines.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Medicines.name, schema: MedicinesSchema }])
  ],
  controllers: [MedicinesController],
  providers: [MedicinesService],
  exports: [MedicinesService]
})
export class MedicinesModule {}
