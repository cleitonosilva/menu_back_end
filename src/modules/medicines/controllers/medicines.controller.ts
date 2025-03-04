import { Controller, Post, Body } from '@nestjs/common';
import { MedicinesService } from '../services/medicines.service';
import { CreateMedicinesDto } from '../dto/create-medicines.dto';

@Controller('medicines')
export class MedicinesController {
  constructor(private readonly medicinesService: MedicinesService) {}

  @Post()
  async create(@Body() data: CreateMedicinesDto) {
    return this.medicinesService.create(data);
  }
}
