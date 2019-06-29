import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@core/decorators/user.decorator';
import { IUser } from './interfaces/user.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class UsersController {

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getUser(@User() user: IUser) {
    return user;
  }

}
