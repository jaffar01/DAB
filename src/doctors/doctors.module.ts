import { Module, forwardRef } from '@nestjs/common';
import { DoctorsController } from './doctors.controller';
import { DoctorsService } from './doctors.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DoctorsSchema } from './entities/doctors.schema';
import { IamModule } from 'src/iam/iam.module';
import { ProviderModule } from 'src/provider/provider.module';

@Module({
  imports:[
    MongooseModule.forFeature([{
      name:'doctors',schema:DoctorsSchema
    }]),
    forwardRef(()=> IamModule),
    forwardRef(()=> ProviderModule),
  ],
  controllers: [DoctorsController],
  providers: [DoctorsService],
  exports:[DoctorsService]
})
export class DoctorsModule {}
