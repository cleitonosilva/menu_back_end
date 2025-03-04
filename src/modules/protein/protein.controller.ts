import { Controller, Post, Body } from '@nestjs/common';
import { ProteinService } from './protein.service';
import { CreateProteinDto } from './dto/create-protein.dto';

@Controller('protein')
export class proteinController {
  constructor(private readonly proteinService: ProteinService) {}

  @Post()
  async create(@Body() data: CreateProteinDto) {
    return this.proteinService.create(data);
  }
}
