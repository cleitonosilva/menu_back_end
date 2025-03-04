import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MenuType } from 'src/schemas/menu-type.schema';
import { CreateMenuTypeDto } from '../dto/create-menu-type.dto';

@Injectable()
export class MenuTypeService {
  constructor(@InjectModel(MenuType.name) private menuTypeModel: Model<MenuType>) {}

  async create(createMenuTypeDto: CreateMenuTypeDto): Promise<MenuType> {
    const exists = await this.menuTypeModel.findOne({ name: createMenuTypeDto.name }).exec();
    if (exists) {
      throw new BadRequestException('Já existe um tipo de menu com esse nome.');
    }

    return this.menuTypeModel.create(createMenuTypeDto);
  }

  async findAll(): Promise<MenuType[]> {
    return this.menuTypeModel.find().exec();
  }

  async findByName(name: string): Promise<MenuType | null> {
    return this.menuTypeModel.findOne({ name }).exec();
  }

  async findById(id: string): Promise<MenuType | null> {
    return this.menuTypeModel.findById(id).exec();
  }
  
}
