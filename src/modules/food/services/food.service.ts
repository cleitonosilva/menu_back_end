import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Food } from '../../schemas/food.schema';
import { CreateFoodDto } from './dto/create-food.dto';

@Injectable()
export class FoodService {
  constructor(@InjectModel(Food.name) private foodModel: Model<Food>) {}

  async create(data: CreateFoodDto): Promise<Food> {
    const existingFood = await this.foodModel.findOne({ name: data.name }).exec();
    if (existingFood) {
      throw new ConflictException('O alimento já existe.');
    }

    return this.foodModel.create(data);
  }

  async findAll(): Promise<Food[]> {
    return this.foodModel.find().exec();
  }
}
