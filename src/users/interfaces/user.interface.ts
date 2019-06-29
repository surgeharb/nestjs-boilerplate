import { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  tokenCode: string;
  password: string;
  salt: string;
}
