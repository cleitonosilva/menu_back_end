import { Controller, Post, Get, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
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

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<CreateFoodDto>) {
    const updatedFood = await this.foodService.update(id, data);
    if (!updatedFood) {
      throw new NotFoundException('Alimento não encontrado.');
    }
    return updatedFood;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deleted = await this.foodService.delete(id);
    if (!deleted) {
      throw new NotFoundException('Alimento não encontrado.');
    }
    return { message: 'Alimento removido com sucesso' };
  }
}
