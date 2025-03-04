import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Accompaniment } from '../../../schemas/accompaniment.schema';
import { Food } from '../../../schemas/food.schema'; 
import { CreateAccompanimentDto } from '../dto/create-accompaniment.dto';
import { isFoodAlreadyUsed } from 'src/common/utils/food-validation.util';
import { Carbohydrate } from 'src/schemas/carbohydrate.schema';
import { Medicines } from 'src/schemas/medicines.schema';
import { Protein } from 'src/schemas/protein.schema';

@Injectable()
export class AccompanimentService {
  constructor(
    @InjectModel(Carbohydrate.name) private carbohydrateModel: Model<Carbohydrate>,
    @InjectModel(Protein.name) private proteinModel: Model<Protein>, 
    @InjectModel(Accompaniment.name) private accompanimentModel: Model<Accompaniment>,
    @InjectModel(Food.name) private foodModel: Model<Food> 
    
  ) {}

  async create(data: CreateAccompanimentDto): Promise<Accompaniment> {
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
  
    const accompaniment = await this.accompanimentModel.create({
      food: foodExists._id, 
      grams: data.grams,
      tablespoon: data.tablespoon
    });
  
    return accompaniment.populate('food'); 
  }
  
  async findAll(): Promise<Accompaniment[]> {
    return this.accompanimentModel.find().populate('food', 'name').exec();
  }

  async update(id: string, data: Partial<CreateAccompanimentDto>): Promise<Accompaniment | null> {
    if (data.food) {
      const foodExists = await this.foodModel.findById(data.food);
      if (!foodExists) {
        throw new NotFoundException('O alimento fornecido não existe.');
      }
    }

    const updatedAccompaniment = await this.accompanimentModel
      .findByIdAndUpdate(id, data, { new: true })
      .populate('food'); 

    if (!updatedAccompaniment) {
      throw new NotFoundException('Acompanhamento não encontrado.');
    }

    return updatedAccompaniment;
  }

  async delete(id: string): Promise<Accompaniment | null> {
    return this.accompanimentModel.findByIdAndDelete(id).exec();
  }
}
