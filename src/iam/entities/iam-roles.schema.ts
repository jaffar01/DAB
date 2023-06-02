import { Schema, Document } from 'mongoose';

export const PermissionsSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    moduleKey: {
      type: String,
      required: true,
    },
    actionsPermitted: {
      type: [String],
      required: true,
    },
  },
  {
    _id: false,
  },
);

export const IamRolesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    key: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    permissions: {
      type: [PermissionsSchema],
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export interface Permissions {
  type: string;
  moduleKey: string;
  actionsPermitted: [string];
}

export interface IamRolesModel extends Document {
  name: string;
  key: string;
  description: string;
  permissions: [Permissions];
  isActive?: boolean;
  isDeleted?: boolean;
}
