import { Schema, Types } from 'mongoose';
import { SUBSCRIPTIONS_VALIDITY, PAYMENT_STATUSES, SUBSCRIPTIONS } from 'src/constants';

export const subscriptionsSchema = new Schema({
  plan:{
    type:String,
    enum: Object.values(SUBSCRIPTIONS),
    required:true,
  },
  validity:{
    type:String,
    enum: Object.values(SUBSCRIPTIONS_VALIDITY),
    required:true,
  },
  startDate:{
    type:String,
    required:true,
  },
  endDate:{
    type:String,
    required:true,
  },
  paymentStatus:{
    type:String,
    enum:Object.values(PAYMENT_STATUSES),
    required:true,
  },
  isActive:{
    type:Boolean,
    default:false,
  },
  isDeleted:{
    type:Boolean,
    default:false,
  },
});

export interface subscriptionsModel extends Document {
  plan:string,
  validity:string,
  startDate:string,
  endDate:string,
  paymentStatus:string
  isActive:boolean,
  isDeleted:boolean
};