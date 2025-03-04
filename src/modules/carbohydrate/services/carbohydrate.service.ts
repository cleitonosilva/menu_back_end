import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Carbohydrate } from '../../../schemas/carbohydrate.schema';
import { CreateCarbohydrateDto } from '../dto/create-carbohydrate.dto';

@Injectable()
export class CarbohydrateService {
  constructor(@InjectModel(Carbohydrate.name) private carbohydrateModel: Model<Carbohydrate>) {}

  async create(data: CreateCarbohydrateDto): Promise<Carbohydrate> {
    return this.carbohydrateModel.create(data);
  }

  async findAll(): Promise<Carbohydrate[]> {
    return this.carbohydrateModel.find().populate('food', 'name').exec();
  }

  async update(id: string, data: Partial<CreateCarbohydrateDto>): Promise<Carbohydrate | null> {
    return this.carbohydrateModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<Carbohydrate | null> {
    return this.carbohydrateModel.findByIdAndDelete(id).exec();
  }
}
