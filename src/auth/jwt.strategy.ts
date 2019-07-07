import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { to } from 'await-to-js';
import * as fs from 'fs';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: `${fs.readFileSync('./config/keys/private.key').toString().replace(/\r?\n|\r/g, '')}`,
    });
  }

  async validate(payload: IJwtPayload) {
    const [error, user] = await to(this.authService.validateUser(payload));

    if (error || !user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}