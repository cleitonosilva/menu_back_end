import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Medicines } from '../../../schemas/medicines.schema';
import { CreateMedicinesDto } from '../dto/create-medicines.dto';

@Injectable()
export class MedicinesService {
  constructor(@InjectModel(Medicines.name) private medicinesModel: Model<Medicines>) {}

  async create(data: CreateMedicinesDto): Promise<Medicines> {
    return this.medicinesModel.create(data);
  }

  async findAll(): Promise<Medicines[]> {
    return this.medicinesModel.find().exec();
  }

  async update(id: string, data: Partial<CreateMedicinesDto>): Promise<Medicines | null> {
    return this.medicinesModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<Medicines | null> {
    return this.medicinesModel.findByIdAndDelete(id).exec();
  }
}
