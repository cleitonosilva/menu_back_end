import { Controller, Post, Get, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { CarbohydrateService } from '../services/carbohydrate.service';
import { CreateCarbohydrateDto } from '../dto/create-carbohydrate.dto';

@Controller('carbohydrate')
export class CarbohydrateController {
  constructor(private readonly carbohydrateService: CarbohydrateService) {}

  @Post()
  async create(@Body() data: CreateCarbohydrateDto) {
    return this.carbohydrateService.create(data);
  }

  @Get()
  async findAll() {
    return this.carbohydrateService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<CreateCarbohydrateDto>) {
    const updatedCarbohydrate = await this.carbohydrateService.update(id, data);
    if (!updatedCarbohydrate) {
      throw new NotFoundException('Carboidrato não encontrado.');
    }
    return updatedCarbohydrate;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deleted = await this.carbohydrateService.delete(id);
    if (!deleted) {
      throw new NotFoundException('Carboidrato não encontrado.');
    }
    return { message: 'Carboidrato removido com sucesso' };
  }
}
