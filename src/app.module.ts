import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuModule } from './modules/menu/menu.module';
import { MenuTypeModule } from './modules/menu-types/menu-type.module';
import { FoodModule } from './modules/food/food.module';
import { AccompanimentModule } from './modules/accompaniment/accompaniment.module';
import { CarbohydrateModule } from './modules/carbohydrate/carbohydrate.module';
import { ProteinModule } from './modules/protein/protein.module';
import { MedicinesModule } from './modules/medicines/medicines.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/meu_banco'),
    MenuModule, 
    MenuTypeModule,
    FoodModule,
    CarbohydrateModule,
    ProteinModule,
    AccompanimentModule,
    MedicinesModule,
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
