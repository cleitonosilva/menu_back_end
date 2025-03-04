import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Accompaniment } from '../../../schemas/accompaniment.schema';
import { CreateAccompanimentDto } from '../dto/create-accompaniment.dto';

@Injectable()
export class AccompanimentService {
  constructor(@InjectModel(Accompaniment.name) private accompanimentModel: Model<Accompaniment>) {}

  async create(data: CreateAccompanimentDto): Promise<Accompaniment> {
    return this.accompanimentModel.create(data);
  }

  async findAll(): Promise<Accompaniment[]> {
    return this.accompanimentModel.find().populate('food', 'name').exec();
  }

  async update(id: string, data: Partial<CreateAccompanimentDto>): Promise<Accompaniment | null> {
    return this.accompanimentModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<Accompaniment | null> {
    return this.accompanimentModel.findByIdAndDelete(id).exec();
  }
}
