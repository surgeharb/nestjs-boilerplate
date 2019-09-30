import { Schema } from 'mongoose';

export const ___NAME___Schema = new Schema({

  // insert your schema fields here...

  // Timestamps
  updatedAt: { type: Date, select: false },
  createdAt: { type: Date, select: false },
  __v: { type: Number, select: false },

}, { timestamps: true });