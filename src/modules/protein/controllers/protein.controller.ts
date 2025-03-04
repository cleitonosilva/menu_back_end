import { Controller, Post, Body } from '@nestjs/common';
import { ProteinService } from '../services/protein.service';
import { CreateProteinDto } from '../dto/create-protein.dto';

@Controller('protein')
export class ProteinController {
  constructor(private readonly proteinService: ProteinService) {}

  @Post()
  async create(@Body() data: CreateProteinDto) {
    return this.proteinService.create(data);
  }
}
