import { Schema } from 'mongoose';

export const UsersSchema = new Schema({

  name: { type: String },
  email: { type: String },

  // Private Fields
  tokenCode: { type: String, select: false },
  password: { type: String, select: false },
  salt: { type: String, select: false },

}, { timestamps: true });
