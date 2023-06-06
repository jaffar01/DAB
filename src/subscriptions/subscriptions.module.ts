import { Module, forwardRef } from '@nestjs/common';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';
import { MongooseModule } from '@nestjs/mongoose';
import { subscriptionsSchema } from './entities/subscriptions.schema';
import { IamModule } from 'src/iam/iam.module';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name:'subscriptions',schema:subscriptionsSchema}
    ]),
    forwardRef(() => IamModule)
  ],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService],
  exports:[SubscriptionsService]
})
export class SubscriptionsModule {}
