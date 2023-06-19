import { Schema, Types, trusted } from 'mongoose';
import { COMMISSION_MODES, CURRENCY, DOCTORS_CATEGORIES, PROVIDER, DOCTOR_STATUS, SERVICE, TAX_MODES, TAX_VALUES } from 'src/constants';
import { providersModel } from 'src/provider/entities/provider.schema';

const TimeFormat = new Schema(
  {
    from: {
      type: String,
      default: '07:00',
    },
    to: {
      type: String,
      default: '22:00',
    },
  },
  {
    _id: false,
  },
);

const Tax = new Schema(
  {
    mode:{
      type:String,
      enum:Object.values(TAX_MODES),
      required:true
    },
    valuue:{
      type:Number,
      enum:Object.values(TAX_VALUES),
      required:true
    }
  },
  {
    _id:false
  }
)

const AvailableTime = new Schema(
  {
    monday: {
      active: {
        type: Boolean,
        default: false,
      },
      timings: {
        type: [TimeFormat],
      },
    },
    tuesday: {
      active: {
        type: Boolean,
        default: false,
      },
      timings: {
        type: [TimeFormat],
      },
    },
    wednesday: {
      active: {
        type: Boolean,
        default: false,
      },
      timings: {
        type: [TimeFormat],
      },
    },
    thursday: {
      active: {
        type: Boolean,
        default: false,
      },
      timings: {
        type: [TimeFormat],
      },
    },
    friday: {
      active: {
        type: Boolean,
        default: false,
      },
      timings: {
        type: [TimeFormat],
      },
    },
    saturday: {
      active: {
        type: Boolean,
        default: false,
      },
      timings: {
        type: [TimeFormat],
      },
    },
    sunday: {
      active: {
        type: Boolean,
        default: false,
      },
      timings: {
        type: [TimeFormat],
      },
    },
  },
  {
    _id: false,
  },
);

const commission = new Schema(
  {
    provider:{
      type:String,
      enum:Object.values(PROVIDER)
    },
    mode:{
      type:String,
      enum:Object.values(COMMISSION_MODES),
      required:true
    },
    value:{
      type:Number,
      required:true
    }
  },
  {
    _id:false
  }
)

const DoctorVariants = new Schema(
  {
    variant:{
      type:String,
      enum:Object.values(SERVICE),
      required:true,
    },
    quantity: {
      type:Number,
      min:1,
      required:true
    },
    unitFee:{
      type:Number,
      required:true
    },
    currency:{
      type:String,
      enum:Object.values(CURRENCY),
      required:true
    },
    totalfee:{
      type:Number,
      required:true
    },
    commissions:[commission]
  }
)

export const DoctorsSchema = new Schema({
  providerId:{
    type:Types.ObjectId,
    required:true
  },
  category:{
    required:true,
    type:String,
    enum:Object.values(DOCTORS_CATEGORIES),
  },
  doctorVariants:{
    type:[DoctorVariants],
    required:true
  },
  status: {
    type:String,
    enum:Object.values(DOCTOR_STATUS),
    required:true,
    defult:'PENDING'
  },
  education:{
    type:String,
    required:true
  },
  registrationNumber:{
    type:String,
    required:true
  },
  about:{
    type:String,
  },
  experience:{
    type:String
  },
  awardsAchievements:{
    type:String
  },
  TAX: {
    type:Tax,
    required:true,
    defult:{mode:'PERCENTAGE', value:0}
  },
  photo:{
    type:String,
  },
  rating:{
    type:String,
  },
  availableTimings:{
    type:AvailableTime,
    default:{},
  },
  isActive: {
    type: Boolean,
    default: false,
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
});

DoctorsSchema.virtual('providerDetails',{
  ref:'provider',
  localField:'providerId',
  foreignField:'_id',
  justOne:true
});

interface TimeFormat {
  from: string;
  to: string;
}

interface AvailableTime {
  monday: {
    active: boolean;
    timings: [TimeFormat];
  };
  tuesday: {
    active: boolean;
    timings: [TimeFormat];
  };
  wednesday: {
    active: boolean;
    timings: [TimeFormat];
  };
  thursday: {
    active: boolean;
    timings: [TimeFormat];
  };
  friday: {
    active: boolean;
    timings: [TimeFormat];
  };
  saturday: {
    active: boolean;
    timings: [TimeFormat];
  };
  sunday: {
    active: boolean;
    timings: [TimeFormat];
  };
};

interface Commission {
  provider:string,
  mode:string,
  value:string
}
interface DoctorVariants {
  quantity:number,
  unitFee:number,
  currency:string,
  totalfee:number,
  commissions: Commission[]
}

interface Tax {
  mode:string;
  value:number;
}

export interface DoctorsModel extends Document {
  providerId:Types.ObjectId,
  category:string,
  photo:string,
  rating:string,
  doctorVariants:DoctorVariants[],
  tax:Tax,
  education:string,
  registrationNumber:string,
  about:string,
  experience:string,
  awardsAchievements:string,
  status:string,
  availableTimings:string,
  isActive?:boolean,
  isDeleted?:boolean,
  providerDetails?:providersModel,
}










