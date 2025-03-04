import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Medicines } from 'src/schemas/medicines.schema';
import { CreateMedicinesDto } from '../dto/create-medicines.dto';

@Injectable()
export class MedicinesService {
  constructor(@InjectModel(Medicines.name) private medicinesModel: Model<Medicines>) {}

  async create(data: CreateMedicinesDto): Promise<Medicines> {
    return this.medicinesModel.create(data);
  }
}
