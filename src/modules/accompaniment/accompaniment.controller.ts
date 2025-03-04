import { Controller, Post, Body } from '@nestjs/common';
import { AccompanimentService } from './accompaniment.service';
import { CreateAccompanimentDto } from './dto/create-accompaniment.dto';

@Controller('accompaniment')
export class AccompanimentController {
  constructor(private readonly accompanimentService: AccompanimentService) {}

  @Post()
  async create(@Body() data: CreateAccompanimentDto) {
    return this.accompanimentService.create(data);
  }
}
