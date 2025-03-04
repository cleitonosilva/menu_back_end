import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCarbohydrateDto } from 'src/modules/carbohydrate/dto/create-carbohydrate.dto';
import { Carbohydrate } from 'src/schemas/carbohydrate.schema';

@Injectable()
export class CarbohydrateService {
  constructor(@InjectModel(Carbohydrate.name) private carbohydrateModel: Model<Carbohydrate>) {}

  async create(data: CreateCarbohydrateDto): Promise<Carbohydrate> {
    return this.carbohydrateModel.create(data);
  }
}
