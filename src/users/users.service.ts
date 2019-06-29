import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { USERS } from '@schemas';
import { Model } from 'mongoose';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(USERS.name) private readonly usersModel: Model<IUser>,
  ) {}

  async findById(userId: string): Promise<IUser> {
    return this.usersModel.findById(userId).lean().exec();
  }

}
