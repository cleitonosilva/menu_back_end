import { Controller, Post, Get, Body, Param, NotFoundException, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() body: CreateUserDto) {
    const user = await this.userService.create(body);
    const { password, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard) 
  async getUserById(@Param('id') id: string) {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  @Get()
  @UseGuards(JwtAuthGuard) 
  async getAllUsers() {
    const users = await this.userService.findAll();
    return users.map(({ password, refreshToken, ...data }) => data);
  }
}
