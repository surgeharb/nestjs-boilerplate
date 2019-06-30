import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '~src/users/dtos/login-user.dto';
import { Lang } from '@core/decorators/lang.decorator';
import { CreateUserDto } from '~src/users/dtos/create-user.dto';

@Controller()
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() userDto: LoginUserDto, @Lang() lang: string) {
    return this.authService.login(userDto, lang);
  }

  @Post('register')
  async register(@Body() userDto: CreateUserDto, @Lang() lang: string) {
    return this.authService.register(userDto, lang);
  }

}
