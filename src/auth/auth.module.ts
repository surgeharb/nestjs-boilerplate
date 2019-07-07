import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import * as fs from 'fs';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: `${fs.readFileSync('./config/keys/private.key').toString().replace(/\r?\n|\r/g, '')}`,
      // signOptions: { expiresIn: 3600 },
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule, AuthService],
})
export class AuthModule { }
