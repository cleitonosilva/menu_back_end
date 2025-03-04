import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Protein } from '../../../schemas/protein.schema';
import { Food } from '../../../schemas/food.schema'; 
import { CreateProteinDto } from '../dto/create-protein.dto';
import { isFoodAlreadyUsed } from 'src/common/utils/food-validation.util';
import { Accompaniment } from 'src/schemas/accompaniment.schema';
import { Carbohydrate } from 'src/schemas/carbohydrate.schema';

@Injectable()
export class ProteinService {
  constructor(
    @InjectModel(Carbohydrate.name) private carbohydrateModel: Model<Carbohydrate>,
    @InjectModel(Protein.name) private proteinModel: Model<Protein>, 
    @InjectModel(Accompaniment.name) private accompanimentModel: Model<Accompaniment>,
    @InjectModel(Food.name) private foodModel: Model<Food> 
  ) {}

  async create(data: CreateProteinDto): Promise<Protein> {
    const foodExists = await this.foodModel.findById(data.food);
    if (!foodExists) {
      throw new NotFoundException('O alimento fornecido não existe.');
    }

    const foodUsed = await isFoodAlreadyUsed(
      data.food,
      this.carbohydrateModel,
      this.proteinModel,
      this.accompanimentModel,
    );
    if (foodUsed) {
      throw new BadRequestException('O alimento já pertence a outra categoria.');
    }

    const protein = await this.proteinModel.create({
      food: foodExists._id,
      grams: data.grams,
      tablespoon: data.tablespoon
    });

    return protein.populate('food'); 
  }

  async findAll(): Promise<Protein[]> {
    return this.proteinModel.find().populate('food', 'name').exec();
  }

  async update(id: string, data: Partial<CreateProteinDto>): Promise<Protein | null> {
    if (data.food) {
      const foodExists = await this.foodModel.findById(data.food);
      if (!foodExists) {
        throw new NotFoundException('O alimento fornecido não existe.');
      }
    }
    

    const updatedProtein = await this.proteinModel
      .findByIdAndUpdate(id, data, { new: true })
      .populate('food'); 

    if (!updatedProtein) {
      throw new NotFoundException('Proteína não encontrada.');
    }

    return updatedProtein;
  }

  async delete(id: string): Promise<Protein | null> {
    return this.proteinModel.findByIdAndDelete(id).exec();
  }
}
