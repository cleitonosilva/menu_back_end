import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Food } from '../../../schemas/food.schema';
import { CreateFoodDto } from '../dto/create-food.dto';
import { Accompaniment } from 'src/schemas/accompaniment.schema';
import { Carbohydrate } from 'src/schemas/carbohydrate.schema';
import { Protein } from 'src/schemas/protein.schema';
import mongoose from 'mongoose';

@Injectable()
export class FoodService {
  constructor(
    @InjectModel(Food.name) private foodModel: Model<Food>,
    @InjectModel(Carbohydrate.name) private carbohydrateModel: Model<Carbohydrate>,
    @InjectModel(Protein.name) private proteinModel: Model<Protein>,
    @InjectModel(Accompaniment.name) private accompanimentModel: Model<Accompaniment>
  ) {}

  async create(data: CreateFoodDto): Promise<Food> {
    const existingFood = await this.foodModel.findOne({ name: data.name }).exec();
    if (existingFood) {
      throw new ConflictException('O alimento já existe.');
    }
    return this.foodModel.create(data);
  }

  async findAll(): Promise<Array<Omit<Food, keyof Document> & { category: string | null, categoryId: string | null, grams: number | null, tablespoon: number | null }>> {
    const foods = await this.foodModel.find().lean(); 
  
    const foodWithCategory = await Promise.all(
      foods.map(async (food) => {
        const carbohydrate = await this.carbohydrateModel.findOne({ food: food._id }).lean();
        const protein = await this.proteinModel.findOne({ food: food._id }).lean();
        const accompaniment = await this.accompanimentModel.findOne({ food: food._id }).lean();
  
        let category: string | null = null;
        let categoryId: string | null = null;
        let grams: number | null = null;
        let tablespoon: number | null = null;
  
        if (carbohydrate) {
          category = 'Carbohydrate';
          categoryId = carbohydrate._id.toString();
          grams = carbohydrate.grams ?? null;
          tablespoon = carbohydrate.tablespoon ?? null;
        } else if (protein) {
          category = 'Protein';
          categoryId = protein._id.toString();
          grams = protein.grams ?? null;
          tablespoon = protein.tablespoon ?? null;
        } else if (accompaniment) {
          category = 'Accompaniment';
          categoryId = accompaniment._id.toString();
          grams = accompaniment.grams ?? null;
          tablespoon = accompaniment.tablespoon ?? null;
        }
  
        return {
          ...food,
          category, 
          categoryId, 
          grams, 
          tablespoon 
        };
      })
    );
  
    return foodWithCategory;
  }
  

  async findById(id: string): Promise<Omit<Food, keyof Document> & { category: string | null, categoryId: string | null, grams: number | null, tablespoon: number | null }> {
    const food = await this.foodModel.findById(id).lean();
    if (!food) {
      throw new NotFoundException('Alimento não encontrado.');
    }
  
    const foodObjectId = new mongoose.Types.ObjectId(id);
  
    const carbohydrate = await this.carbohydrateModel.findOne({ food: foodObjectId }).lean();
    const protein = await this.proteinModel.findOne({ food: foodObjectId }).lean();
    const accompaniment = await this.accompanimentModel.findOne({ food: foodObjectId }).lean();
  
    let category: string | null = null;
    let categoryId: string | null = null;
    let grams: number | null = null;
    let tablespoon: number | null = null;
  
    if (carbohydrate) {
      category = 'Carbohydrate';
      categoryId = carbohydrate._id.toString();
      grams = carbohydrate.grams ?? null;
      tablespoon = carbohydrate.tablespoon ?? null;
    } else if (protein) {
      category = 'Protein';
      categoryId = protein._id.toString();
      grams = protein.grams ?? null;
      tablespoon = protein.tablespoon ?? null;
    } else if (accompaniment) {
      category = 'Accompaniment';
      categoryId = accompaniment._id.toString();
      grams = accompaniment.grams ?? null;
      tablespoon = accompaniment.tablespoon ?? null;
    }
  
    return {
      ...food,
      category, 
      categoryId, 
      grams, 
      tablespoon 
    };
  }
  

  async update(id: string, data: Partial<CreateFoodDto>): Promise<Food | null> {
    return this.foodModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<Food | null> {
    return this.foodModel.findByIdAndDelete(id).exec();
  }
}
