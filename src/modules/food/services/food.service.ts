import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFoodDto } from '../dto/create-food.dto';
import { Food } from 'src/schemas/food.schema';

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
