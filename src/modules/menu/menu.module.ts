import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Menu, MenuSchema } from 'src/schemas/menu.schema';
import { MenuTypeModule } from '../menu-types/menu-type.module';
import { MenuController } from './controllers/menu.controller';
import { MenuService } from './services/menu.service';
@Module({
  imports: [MongooseModule.forFeature([{ name: Menu.name, schema: MenuSchema }]),
    MenuTypeModule,
  ],
  controllers: [MenuController],
  providers: [MenuService],
  exports: [MenuService],
})
export class MenuModule {}
