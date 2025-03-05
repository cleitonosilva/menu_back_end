import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../schemas/user.schema';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';

/**
 * @module UserModule
 * @description Módulo responsável pelo gerenciamento de usuários no sistema.
 */
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }],
      
    )
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
