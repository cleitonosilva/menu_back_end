import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuType, MenuTypeSchema } from '../../schemas/menu-type.schema';
import { MenuTypeService } from './menu-type.service';
import { MenuTypeController } from './menu-type.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: MenuType.name, schema: MenuTypeSchema }])],
  controllers: [MenuTypeController],
  providers: [MenuTypeService],
  exports: [MenuTypeService],
})
export class MenuTypeModule {}
