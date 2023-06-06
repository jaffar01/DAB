import { Module, forwardRef } from '@nestjs/common';
import { ProviderController } from './provider.controller';
import { ProviderService } from './provider.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProvidersSchema } from './entities/provider.schema';
import { IamModule } from 'src/iam/iam.module';
import { SubscriptionsModule } from 'src/subscriptions/subscriptions.module';

@Module({
  imports:[
    MongooseModule.forFeature([{
      name:'providers', schema:ProvidersSchema
    }]),
    forwardRef(()=> IamModule),
    forwardRef(()=> SubscriptionsModule)
  ],
  controllers: [ProviderController],
  providers: [ProviderService],
  exports:[ProviderService]
})
export class ProviderModule {}
