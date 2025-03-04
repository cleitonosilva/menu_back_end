import { Controller, Post, Get, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { ProteinService } from '../services/protein.service';
import { CreateProteinDto } from '../dto/create-protein.dto';

@Controller('protein')
export class ProteinController {
  constructor(private readonly proteinService: ProteinService) {}

  @Post()
  async create(@Body() data: CreateProteinDto) {
    return this.proteinService.create(data);
  }

  @Get()
  async findAll() {
    return this.proteinService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<CreateProteinDto>) {
    const updatedProtein = await this.proteinService.update(id, data);
    if (!updatedProtein) {
      throw new NotFoundException('Proteína não encontrada.');
    }
    return updatedProtein;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deleted = await this.proteinService.delete(id);
    if (!deleted) {
      throw new NotFoundException('Proteína não encontrada.');
    }
    return { message: 'Proteína removida com sucesso' };
  }
}
