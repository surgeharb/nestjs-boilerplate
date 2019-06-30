import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';

@Controller()
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async getUser(@Param('id') userId: string) {
    return { user: await this.usersService.findById(userId) };
  }

}
