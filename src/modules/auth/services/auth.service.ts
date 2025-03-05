import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/services/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  /**
   * Autentica um usuário e gera tokens de acesso e refresh.
   */
  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const payload = { email: user.email, sub: user._id };

    const access_token = this.jwtService.sign(payload, { expiresIn: '1h' });
    const refresh_token = this.jwtService.sign(payload, { expiresIn: '7d' });

    return { access_token, refresh_token };
  }

  /**
   * Gera um novo access_token usando um refresh_token válido.
   */
  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const newAccessToken = this.jwtService.sign(
        { email: payload.email, sub: payload.sub },
        { expiresIn: '1h' } 
      );
      return { access_token: newAccessToken };
    } catch (e) {
      throw new UnauthorizedException('Refresh token inválido ou expirado.');
    }
  }
}
