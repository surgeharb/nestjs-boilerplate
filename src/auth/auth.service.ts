import { JwtService } from '@nestjs/jwt';
import { Injectable, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { IUser } from '../users/interfaces/user.interface';
import { CreateUserDto } from '~src/users/dtos/create-user.dto';
import { LoginUserDto } from '~src/users/dtos/login-user.dto';
import { PasswordService } from '@core/services/password.service';
import { ConfigService } from '@core/config/config.service';
import to from 'await-to-js';

@Injectable()
export class AuthService {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  public async login(userDto: LoginUserDto, lang: string) {
    const user = await this.usersService.findByEmail(userDto.email, true);
    if (!user) {
      throw { message: this.configService.translate('LOGIN_ERR', lang), status: HttpStatus.UNAUTHORIZED };
    }

    const { hash } = this.passwordService.hash(userDto.password, user.salt);
    if (user.password !== hash) {
      throw { message: this.configService.translate('LOGIN_ERR', lang), status: HttpStatus.UNAUTHORIZED };
    }

    return { user, token: this.signUserToken(user, user.tokenCode) };
  }

  public async register(userDto: CreateUserDto, lang: string) {
    const { salt, hash } = this.passwordService.hash(userDto.password);
    const tokenCode = this.passwordService.generateRandomString(32); // tokenCode to invalidate token if needed

    const [error, user] = await to(this.usersService.create({ ...userDto, salt, password: hash }));

    if (error || (error && error.code === 11000)) {
      throw { message: this.configService.translate('EMAIL_IN_USE', lang), status: HttpStatus.FORBIDDEN };
    }

    await this.usersService.addTokenCode(user._id, tokenCode);
    return { user, token: this.signUserToken(user, tokenCode) };
  }

  public async validateUser(payload: IJwtPayload): Promise<IUser> {
    const user = await this.usersService.findById(payload.id, true);
    if (!user) { return user; }

    if (!user.tokenCodes.includes(payload.tokenCode)) {
      return null;
    }

    delete user.tokenCodes;
    return user;
  }

  private signUserToken(user: IUser, tokenCode: string): string {
    const payload: IJwtPayload = { id: user._id, email: user.email, tokenCode };
    return this.jwtService.sign(payload);
  }
}
