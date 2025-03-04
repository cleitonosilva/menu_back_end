import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Protein } from 'src/schemas/protein.schema';
import { CreateProteinDto } from '../dto/create-protein.dto';

@Injectable()
export class ProteinService {
  constructor(@InjectModel(Protein.name) private proteinModel: Model<Protein>) {}

  async create(data: CreateProteinDto): Promise<Protein> {
    return this.proteinModel.create(data);
  }
}
