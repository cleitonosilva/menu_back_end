import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Carbohydrate } from '../../../schemas/carbohydrate.schema';
import { Protein } from '../../../schemas/protein.schema';
import { Accompaniment } from '../../../schemas/accompaniment.schema';
import { Food } from '../../../schemas/food.schema';
import { CreateCarbohydrateDto } from '../dto/create-carbohydrate.dto';
import { isFoodAlreadyUsed } from '../../../common/utils/food-validation.util';

@Injectable()
export class CarbohydrateService {
  constructor(
    @InjectModel(Carbohydrate.name) private carbohydrateModel: Model<Carbohydrate>,
    @InjectModel(Protein.name) private proteinModel: Model<Protein>, 
    @InjectModel(Accompaniment.name) private accompanimentModel: Model<Accompaniment>,
    @InjectModel(Food.name) private foodModel: Model<Food> 
  ) {}

  async create(data: CreateCarbohydrateDto): Promise<Carbohydrate> {
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

    const carbohydrate = await this.carbohydrateModel.create({
      food: foodExists._id,
      grams: data.grams,
      tablespoon: data.tablespoon
    });

    return carbohydrate.populate('food');
  }
  
  async findAll(): Promise<Carbohydrate[]> {
    return this.carbohydrateModel.find().populate('food', 'name').exec();
  }
  

  async update(id: string, data: Partial<CreateCarbohydrateDto>): Promise<Carbohydrate | null> {
    if (data.food) {
      const foodExists = await this.foodModel.findById(data.food);
      if (!foodExists) {
        throw new NotFoundException('O alimento fornecido não existe.');
      }
    }
  
    const updatedCarbohydrate = await this.carbohydrateModel
      .findByIdAndUpdate(id, data, { new: true })
      .populate('food');
  
    if (!updatedCarbohydrate) {
      throw new NotFoundException('Carboidrato não encontrado.');
    }
  
    return updatedCarbohydrate;
  }
  

  async delete(id: string): Promise<Carbohydrate | null> {
    return this.carbohydrateModel.findByIdAndDelete(id).exec();
  }
}
