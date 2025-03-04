import { Controller, Post, Get, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { AccompanimentService } from '../services/accompaniment.service';
import { CreateAccompanimentDto } from '../dto/create-accompaniment.dto';

@Controller('accompaniment')
export class AccompanimentController {
  constructor(private readonly accompanimentService: AccompanimentService) {}

  @Post()
  async create(@Body() data: CreateAccompanimentDto) {
    return this.accompanimentService.create(data);
  }

  @Get()
  async findAll() {
    return this.accompanimentService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<CreateAccompanimentDto>) {
    const updatedAccompaniment = await this.accompanimentService.update(id, data);
    if (!updatedAccompaniment) {
      throw new NotFoundException('Acompanhamento não encontrado.');
    }
    return updatedAccompaniment;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deleted = await this.accompanimentService.delete(id);
    if (!deleted) {
      throw new NotFoundException('Acompanhamento não encontrado.');
    }
    return { message: 'Acompanhamento removido com sucesso' };
  }
}
