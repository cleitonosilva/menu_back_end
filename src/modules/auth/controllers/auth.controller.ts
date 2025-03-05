import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Endpoint para login do usuário e geração de tokens (access_token e refresh_token).
   * @param email - Email do usuário.
   * @param password - Senha do usuário.
   * @returns access_token e refresh_token.
   */
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  /**
   * Endpoint para renovar o access_token usando um refresh_token válido.
   * @param refresh_token - Token de atualização válido.
   * @returns Novo access_token.
   */
  @Post('refresh')
  async refresh(@Body('refresh_token') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }
}