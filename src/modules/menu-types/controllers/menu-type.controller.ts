import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { MenuTypeService } from '../services/menu-type.service';
import { CreateMenuTypeDto } from '../dto/create-menu-type.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

@Controller('menu-type')
export class MenuTypeController {
  constructor(private readonly menuTypeService: MenuTypeService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createMenuTypeDto: CreateMenuTypeDto) {
    return this.menuTypeService.create(createMenuTypeDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.menuTypeService.findAll();
  }
}
