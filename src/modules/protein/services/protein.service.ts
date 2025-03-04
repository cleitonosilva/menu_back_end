import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Protein } from '../../../schemas/protein.schema';
import { CreateProteinDto } from '../dto/create-protein.dto';

@Injectable()
export class ProteinService {
  constructor(@InjectModel(Protein.name) private proteinModel: Model<Protein>) {}

  async create(data: CreateProteinDto): Promise<Protein> {
    return this.proteinModel.create(data);
  }

  async findAll(): Promise<Protein[]> {
    return this.proteinModel.find().populate('food', 'name').exec();
  }

  async update(id: string, data: Partial<CreateProteinDto>): Promise<Protein | null> {
    return this.proteinModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<Protein | null> {
    return this.proteinModel.findByIdAndDelete(id).exec();
  }
}
