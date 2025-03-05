import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from '../dto/create-user.dto';


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  /**
   * Cria um novo usuário no banco de dados.
   * @param userDto - DTO contendo email, senha, nome e telefone.
   * @returns O usuário criado.
   */
  async create(userDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(userDto);
    return createdUser.save();
  }

  /**
   * Busca um usuário pelo ID.
   * @param id - ID do usuário.
   * @returns O usuário encontrado ou erro 404 se não existir.
   */
  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).lean();
    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }
    return user;
  }

  /**
   * Lista todos os usuários cadastrados.
   * @returns Lista de usuários.
   */
  async findAll(): Promise<User[]> {
    return this.userModel.find().lean();
  }

  /**
   * Busca usuário pelo email.
   * @param email - Email do usuário.
   * @returns O usuário encontrado ou null se não existir.
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }


/**
 * Salva o refreshToken no banco para um usuário específico.
 * @param userId - ID do usuário.
 * @param refreshToken - Token de atualização.
 */
async saveRefreshToken(userId: string, refreshToken: string) {
  await this.userModel.updateOne({ _id: userId }, { refreshToken });
}

/**
 * Remove o refreshToken do banco, invalidando o usuário.
 * @param userId - ID do usuário.
 */
  async removeRefreshToken(userId: string) {
    await this.userModel.updateOne({ _id: userId }, { $unset: { refreshToken: 1 } });
  }
}
