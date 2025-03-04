import { Controller, Post, Get, Body } from '@nestjs/common';
import { FoodService } from '../services/food.service';
import { CreateFoodDto } from '../dto/create-food.dto';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post()
  async create(@Body() data: CreateFoodDto) {
    return this.foodService.create(data);
  }

  @Get()
  async findAll() {
    return this.foodService.findAll();
  }
}
