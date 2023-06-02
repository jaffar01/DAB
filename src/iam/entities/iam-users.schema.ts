import { Schema, Document, Types } from 'mongoose';

export const IamUsersSchema = new Schema(
  {
    name: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      // required: true,
      lowercase: true,
      unique: true,
      sparse: true,
    },
    mobileNumber: {
      type: String,
      // required: true,
      unique: true,
      sparse: true,
    },
    password: {
      type: String,
      // required: true,
    },
    rolesId: {
      type: [Types.ObjectId],
      required: true,
    },
    country: {
      type: String,
      // required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    loginOTP: {
      type: String,
      default: '',
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

IamUsersSchema.virtual('roleDetails', {
  ref: 'iam-roles',
  localField: 'rolesId',
  foreignField: '_id',
  justOne: false,
});

IamUsersSchema.virtual('userDetails',{
  ref: 'iam-user-details',
  localField: '_id',
  foreignField: 'userId',
  justOne: true,
})

export interface IamUsersModel extends Document {
  name?: string;
  email?: string;
  mobileNumber?: string;
  password?: string;
  country?: string;
  rolesId: [Types.ObjectId];
  isActive?: boolean;
  isDeleted?: boolean;
  loginOTP: string;
}
