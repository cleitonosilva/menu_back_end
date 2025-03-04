import { Controller, Get, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { Menu } from 'src/schemas/menu.schema';

@Controller('menu')
export class MenuController {
  menuModel: any;
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.createMenu(createMenuDto);
  }

  @Get()
  async findAll(): Promise<Menu[]> {
    return this.menuService.findAll();
  }
  
}
