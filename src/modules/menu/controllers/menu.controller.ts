import { Controller, Get, Post, Body, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { MenuService } from '../services/menu.service';
import { CreateMenuDto } from '../dto/create-menu.dto';
import { Menu } from 'src/schemas/menu.schema';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

@Controller('menu')
export class MenuController {
  menuModel: any;
  constructor(private readonly menuService: MenuService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.createMenu(createMenuDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Menu[]> {
    return this.menuService.findAll();
  }
  
}
