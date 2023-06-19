import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IamService } from 'src/iam/iam.service';
import { DoctorsModel } from './entities/doctors.schema';
import { ProviderService } from 'src/provider/provider.service';
import { JWTUser } from 'src/common/interfaces/JWT-user';
import { AddDoctorDTO } from './dto/add_doctor.dto';
import { calculateVariantPriceDetails } from './helpers';


@Injectable()
export class DoctorsService {
  constructor(
    @Inject(forwardRef(()=>IamService))
    private readonly iamservice:IamService,
    @InjectModel('doctors')
    private readonly doctorsModel:Model<DoctorsModel>,
    @Inject(forwardRef(()=>ProviderService))
    private readonly providerservice:ProviderService
  ) {}
  async registerDoctor(user:JWTUser, addDoctorDTO:AddDoctorDTO,file){
    let doctorVariants = [],
    availableTimings = {},
    providerDetails,
    Tax;
    if(addDoctorDTO.availableTimings) availableTimings = JSON.parse(addDoctorDTO.availableTimings);
    if(addDoctorDTO.doctorVariants)
    doctorVariants = JSON.parse(addDoctorDTO.doctorVariants);
    if (addDoctorDTO.Tax)
    Tax = JSON.parse(addDoctorDTO.Tax);
    try {
      providerDetails = await this.providerservice.getAllProviders({
        user:user.IAMUserId
      });
      if(!providerDetails) return [{message:'Unable to get provider'}]
    } catch (err) {
      throw new Error(err);
    }

    doctorVariants?.map((variant) => {
      const totalFee = calculateVariantPriceDetails({
        unitFee:variant.unitFee,
        Tax:Tax
      });
      variant.totalfee = totalFee;
      return variant
    })
  }
}
