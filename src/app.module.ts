import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuModule } from './modules/menu/menu.module';
import { MenuTypeModule } from './modules/menu-types/menu-type.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/meu_banco'),
    MenuModule, 
    MenuTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
