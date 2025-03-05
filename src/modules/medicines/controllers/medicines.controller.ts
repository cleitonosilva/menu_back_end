import { Controller, Post, Get, Put, Delete, Body, Param, NotFoundException, UseGuards } from '@nestjs/common';
import { MedicinesService } from '../services/medicines.service';
import { CreateMedicinesDto } from '../dto/create-medicines.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

@Controller('medicines')
export class MedicinesController {
  constructor(private readonly medicinesService: MedicinesService) {}

  @UseGuards(JwtAuthGuard) 
  @Post()
  async create(@Body() data: CreateMedicinesDto) {
    return this.medicinesService.create(data);
  }

  @UseGuards(JwtAuthGuard) 
  @Get()
  async findAll() {
    return this.medicinesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<CreateMedicinesDto>) {
    const updatedMedicine = await this.medicinesService.update(id, data);
    if (!updatedMedicine) {
      throw new NotFoundException('Medicamento não encontrado.');
    }
    return updatedMedicine;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deleted = await this.medicinesService.delete(id);
    if (!deleted) {
      throw new NotFoundException('Medicamento não encontrado.');
    }
    return { message: 'Medicamento removido com sucesso' };
  }
}


