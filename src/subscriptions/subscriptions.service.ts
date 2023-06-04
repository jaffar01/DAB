import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AddSubscriptionDto } from './dto/add-subscription.dto';
// import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { subscriptionsModel } from './entities/subscriptions.schema';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectModel('subscriptions')
    private readonly subscriptionsModel: Model<subscriptionsModel>,
  ) {}

  async registerSubscription(addSubscriptionDto: AddSubscriptionDto) {
    try {
      const Subscription = await this.subscriptionsModel.create({
        plan: addSubscriptionDto.plan,
        validity: addSubscriptionDto.validity,
        startDate: addSubscriptionDto.startDate,
        endDate: addSubscriptionDto.endDate,
        paymentStatus: addSubscriptionDto.paymentStatus,
        isActive: true,
        isDeleted: false,
      });
      return Subscription;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getAllSubscriptions() {
    try {
      return await this.subscriptionsModel.find({ isDeleted: false });
    } catch (err) {
      throw new Error(err);
    }
  }

  async getSubscriptionDetails(subscriptionId) {
    try {
      return await this.subscriptionsModel.findOne({
        _id: new Types.ObjectId(subscriptionId),
        isDeleted: false,
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  async updateSubscriptionDetails(
    subscriptionId,
    updateSubscriptionDto: UpdateSubscriptionDto,
  ) {
    try {
      const subscription = await this.subscriptionsModel.findOne({
        _id: new Types.ObjectId(subscriptionId),
        isDeleted: false,
      });
      if (
        updateSubscriptionDto.plan &&
        updateSubscriptionDto.plan !== subscription.plan
      ) {
        subscription.plan = updateSubscriptionDto.plan || subscription.plan;
      }
      if (
        updateSubscriptionDto.validity &&
        updateSubscriptionDto.validity !== subscription.validity
      ) {
        subscription.validity =
          updateSubscriptionDto.validity || subscription.validity;
      }
      if (
        updateSubscriptionDto.startDate &&
        updateSubscriptionDto.startDate !== subscription.startDate
      ) {
        subscription.startDate =
          updateSubscriptionDto.startDate || subscription.startDate;
      }
      if (
        updateSubscriptionDto.endDate &&
        updateSubscriptionDto.endDate !== subscription.endDate
      ) {
        subscription.endDate =
          updateSubscriptionDto.endDate || subscription.endDate;
      }
      if (
        updateSubscriptionDto.paymentStatus &&
        updateSubscriptionDto.paymentStatus !== subscription.paymentStatus
      ) {
        subscription.paymentStatus =
          updateSubscriptionDto.paymentStatus || subscription.paymentStatus;
      }
      subscription.save();
      return subscription;
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteSubscription(subscriptionId) {
    try {
      const subscription = await this.subscriptionsModel.findOne({
        _id: new Types.ObjectId(subscriptionId),
        isActive: true,
        isDeleted: false,
      });
      if (subscription) {
        subscription.isActive = false;
        subscription.isDeleted = true;
        subscription.save();
        return { message: 'subscription deleted successfuly' };
      } else {
        return { message: 'unable to delete subscription' };
      }
    } catch (err) {}
  }
}
