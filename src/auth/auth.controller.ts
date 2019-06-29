import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login() {
    return this.authService.login();
  }

  @Post('register')
  async register() {
    return this.authService.register();
  }

}
