import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { AddSubscriptionDto } from './dto/add-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PermissionsGuard } from 'src/auth/gaurds/permissions.guard';
import { JwtAuthGuard } from 'src/auth/gaurds/jwt-auth.guard';
import { apiResponse } from 'src/helpers/apiresponse';

@ApiBearerAuth()
@Controller('subscriptions')
@SetMetadata('MODULE', 'SUBSCRIPTIONS')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post('')
  @SetMetadata('ACTION', ['CREATE'])
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  async registerSubscription(@Body() addSubscriptionDto: AddSubscriptionDto) {
    try {
      const subscription = await this.subscriptionsService.registerSubscription(
        addSubscriptionDto,
      );
      return apiResponse(true, { subscription });
    } catch (err) {
      console.log(err);
      if (err instanceof HttpException) throw err;
      else
        throw new InternalServerErrorException({
          status: false,
          error: err.message,
          message: 'Unable to register new subscription',
        });
    }
  }

  @Get('')
  @SetMetadata('ACTION', ['VIEW', 'VIEW_ALL'])
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  async getAllSubscriptions() {
    try {
      const subscriptions =
        await this.subscriptionsService.getAllSubscriptions();
      return apiResponse(true, { subscriptions });
    } catch (err) {
      console.log(err);
      if (err instanceof HttpException) throw err;
      else
        throw new InternalServerErrorException({
          status: false,
          error: err.message,
          message: 'Unable to fetch subscription details',
        });
    }
  }

  @Get(':id')
  @SetMetadata('ACTION', ['VIEW'])
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  async getSubscriptionDetails(@Param('id') subscriptionId: string) {
    try {
      const subscription =
        await this.subscriptionsService.getSubscriptionDetails(subscriptionId);
      return apiResponse(true, { subscription });
    } catch (err) {
      console.log(err);
      if (err instanceof HttpException) throw err;
      else
        throw new InternalServerErrorException({
          status: false,
          error: err.message,
          message: 'Unable to featch Subscription details',
        });
    }
  }

  @Put('')
  @SetMetadata('ACTION', ['UPDATE'])
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  async updateSubscription(
    @Param('id') subscriptionId: string,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
  ) {
    try {
      const subscription =
        await this.subscriptionsService.updateSubscriptionDetails(
          subscriptionId,
          updateSubscriptionDto,
        );
      return apiResponse(true, { subscription });
    } catch (err) {
      console.log(err);
      if (err instanceof HttpException) throw err;
      else
        throw new InternalServerErrorException({
          status: false,
          error: err.message,
          message: 'Unable to update Subscription details',
        });
    }
  }

  @Delete(':id')
  @SetMetadata('ACTION', ['DELETE'])
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  async deleteSubscription(@Param('id') subscriptionId: string) {
    try {
      const subscription = await this.subscriptionsService.deleteSubscription(
        subscriptionId,
      );
      return apiResponse(true, { subscription });
    } catch (err) {
      console.log(err);
      if (err instanceof HttpException) throw err;
      else
        throw new InternalServerErrorException({
          status: false,
          error: err.message,
          message: 'Unable to delete Subscription',
        });
    }
  }
}
