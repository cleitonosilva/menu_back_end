import { Controller, Get, Post, Body } from '@nestjs/common';
import { MenuTypeService } from './menu-type.service';
import { CreateMenuTypeDto } from './dto/create-menu-type.dto';

@Controller('menu-type')
export class MenuTypeController {
  constructor(private readonly menuTypeService: MenuTypeService) {}

  @Post()
  async create(@Body() createMenuTypeDto: CreateMenuTypeDto) {
    return this.menuTypeService.create(createMenuTypeDto);
  }

  @Get()
  async findAll() {
    return this.menuTypeService.findAll();
  }
}
