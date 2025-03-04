import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuType, MenuTypeSchema } from '../../schemas/menu-type.schema';
import { MenuTypeController } from './controllers/menu-type.controller';
import { MenuTypeService } from './services/menu-type.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: MenuType.name, schema: MenuTypeSchema }])],
  controllers: [MenuTypeController],
  providers: [MenuTypeService],
  exports: [MenuTypeService],
})
export class MenuTypeModule {}
