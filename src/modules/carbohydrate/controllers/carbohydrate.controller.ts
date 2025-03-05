import { Controller, Post, Get, Put, Delete, Body, Param, NotFoundException, UseGuards } from '@nestjs/common';
import { CarbohydrateService } from '../services/carbohydrate.service';
import { CreateCarbohydrateDto } from '../dto/create-carbohydrate.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

@Controller('carbohydrate')
export class CarbohydrateController {
  constructor(private readonly carbohydrateService: CarbohydrateService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: CreateCarbohydrateDto) {
    return this.carbohydrateService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.carbohydrateService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<CreateCarbohydrateDto>) {
    const updatedCarbohydrate = await this.carbohydrateService.update(id, data);
    if (!updatedCarbohydrate) {
      throw new NotFoundException('Carboidrato não encontrado.');
    }
    return updatedCarbohydrate;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deleted = await this.carbohydrateService.delete(id);
    if (!deleted) {
      throw new NotFoundException('Carboidrato não encontrado.');
    }
    return { message: 'Carboidrato removido com sucesso' };
  }
}
