import { Controller, Post, Get, Put, Delete, Body, Param, NotFoundException, UseGuards } from '@nestjs/common';
import { FoodService } from '../services/food.service';
import { CreateFoodDto } from '../dto/create-food.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: CreateFoodDto) {
    return this.foodService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.foodService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.foodService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<CreateFoodDto>) {
    const updatedFood = await this.foodService.update(id, data);
    if (!updatedFood) {
      throw new NotFoundException('Alimento não encontrado.');
    }
    return updatedFood;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deleted = await this.foodService.delete(id);
    if (!deleted) {
      throw new NotFoundException('Alimento não encontrado.');
    }
    return { message: 'Alimento removido com sucesso' };
  }
}
