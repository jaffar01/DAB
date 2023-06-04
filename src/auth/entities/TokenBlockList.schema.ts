import { Schema, Document } from 'mongoose';

export const TokenBlackListSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
});

export interface TokenBlockListModule extends Document {
  token?:string;
}