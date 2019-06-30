import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { USERS } from '@schemas';
import { Model } from 'mongoose';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(USERS.name) private readonly usersModel: Model<IUser>,
  ) { }

  public async create(user: CreateUserDto): Promise<IUser> {
    if (await this.findByEmail(user.email)) {
      throw new Error('EMAIL_IN_USE');
    }

    const createdUser = await this.usersModel.create(user);
    return this.usersModel.findById(createdUser._id);
  }

  public findByEmail(email: string, forPasswordVerification = false): Promise<IUser> {
    let query = this.usersModel.findOne({ email });

    if (forPasswordVerification) {
      query = query.select('+salt +password');
    }

    return query.lean().exec();
  }

  public findById(userId: string, forJwtValidation = false): Promise<IUser> {
    let query = this.usersModel.findById(userId);

    if (forJwtValidation) {
      query = query.select('+tokenCodes');
    }

    return query.lean().exec();
  }

  public addTokenCode(userId: string, code: string): Promise<IUser> {
    return this.usersModel.findByIdAndUpdate(userId, { $push: { tokenCodes: code } }).lean().exec();
  }

  public removeTokenCode(userId: string, code = 'all'): Promise<IUser> {
    const update =
      (code === 'all') ? { $set: { tokenCodes: [] } } : { $pull: { tokenCodes: code } };

    return this.usersModel.findByIdAndUpdate(userId, update).lean().exec();
  }

}
