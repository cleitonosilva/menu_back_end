import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Menu, MenuSchema } from 'src/schemas/menu.schema';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { MenuTypeModule } from '../menu-types/menu-type.module';
@Module({
  imports: [MongooseModule.forFeature([{ name: Menu.name, schema: MenuSchema }]),
    MenuTypeModule,
  ],
  controllers: [MenuController],
  providers: [MenuService],
  exports: [MenuService],
})
export class MenuModule {}
