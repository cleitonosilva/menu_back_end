import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Menu } from 'src/schemas/menu.schema';
import { CreateMenuDto } from '../dto/create-menu.dto';
import { MenuTypeService } from 'src/modules/menu-types/services/menu-type.service';
@Injectable()
export class MenuService {
  constructor(
    @InjectModel(Menu.name) private menuModel: Model<Menu>,
    private readonly menuTypeService: MenuTypeService
  ) {}

  async createMenu(data: CreateMenuDto): Promise<Menu> {
    const menuType = await this.menuTypeService.findById(data.menuType);
    if (!menuType) {
      throw new NotFoundException(`O tipo de menu com ID "${data.menuType}" não foi encontrado.`);
    }
  
    const validationErrors: { field: string; errors: string[] }[] = [];
  
    if (menuType.proteinQuantity > 0 && !data.protein) {
      validationErrors.push({
        field: 'protein',
        errors: [`Necessário informar ${menuType.proteinQuantity} de proteína(s).`]
      });
    }
  
    if (menuType.carbohydrateQuantity > 0) {
      if (!Array.isArray(data.carbohydrate)) {
        validationErrors.push({
          field: 'carbohydrate',
          errors: [`Necessário informar ${menuType.carbohydrateQuantity} de carboidrato(s).`]
        });
      } else if (data.carbohydrate.length !== menuType.carbohydrateQuantity) {
        validationErrors.push({
          field: 'carbohydrate',
          errors: [`O menu deve conter exatamente ${menuType.carbohydrateQuantity} carboidrato(s).`]
        });
      }
    }
  
    if (menuType.accompanimentQuantity > 0) {
      if (!Array.isArray(data.accompaniment)) {
        validationErrors.push({
          field: 'accompaniment',
          errors: [`Necessário informar ${menuType.accompanimentQuantity} de acompanhamento(s).`]
        });
      } else if (data.accompaniment.length !== menuType.accompanimentQuantity) {
        validationErrors.push({
          field: 'accompaniment',
          errors: [`O menu deve conter exatamente ${menuType.accompanimentQuantity} acompanhamento(s).`]
        });
      }
    }
  
    if (data.medicines && !Array.isArray(data.medicines)) {
      validationErrors.push({
        field: 'medicines',
        errors: ['O campo medicines deve ser um array.']
      });
    }
  
    if (validationErrors.length > 0) {
      throw new BadRequestException({ statusCode: 400, error: 'Bad Request', message: validationErrors });
    }
  
    return this.menuModel.create({
      ...data,
      medicines: data.medicines || [] 
    });
  }

  async findAll(): Promise<Menu[]> {
    return this.menuModel
      .find()
      .populate('menuType', 'name')
      .exec();
  }
  
  
  
}
