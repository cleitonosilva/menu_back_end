import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Accompaniment } from 'src/schemas/accompaniment.schema';
import { CreateAccompanimentDto } from '../dto/create-accompaniment.dto';

@Injectable()
export class AccompanimentService {
  constructor(@InjectModel(Accompaniment.name) private accompanimentModel: Model<Accompaniment>) {}

  async create(data: CreateAccompanimentDto): Promise<Accompaniment> {
    return this.accompanimentModel.create(data);
  }
}
