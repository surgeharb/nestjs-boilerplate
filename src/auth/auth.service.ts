import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { IUser } from '../users/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login() {
    const user: IJwtPayload = { email: 'user@email.com', tokenCode: '123', id: '123' };
    return { token: this.jwtService.sign(user) };
  }

  async register() {
    const user: IJwtPayload = { email: 'user@email.com', tokenCode: '123', id: '123' };
    return { token: this.jwtService.sign(user) };
  }

  async validateUser(payload: IJwtPayload): Promise<IUser> {
    return this.usersService.findById(payload.id);
  }
}
