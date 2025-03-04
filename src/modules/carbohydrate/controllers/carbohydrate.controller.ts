import { Controller, Post, Body } from '@nestjs/common';
import { CarbohydrateService } from './carbohydrate.service';
import { CreateCarbohydrateDto } from './dto/create-carbohydrate.dto';

@Controller('carbohydrate')
export class CarbohydrateController {
  constructor(private readonly carbohydrateService: CarbohydrateService) {}

  @Post()
  async create(@Body() data: CreateCarbohydrateDto) {
    return this.carbohydrateService.create(data);
  }
}
