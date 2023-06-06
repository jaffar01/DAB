import { Schema, Types } from 'mongoose';
import { COMMISSION_MODES, PROVIDER, PROVIDER_TYPES, SERVICES_OFFERED } from 'src/constants';

const Address = new Schema(
  {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
    },
  },
  {
    _id: false,
  },
);

const AccountDetails = new Schema(
  {
    accountNumber: {
      type: String,
    },
    accountName: {
      type: String,
    },
    bankName: {
      type: String,
    },
    ifsc: {
      type: String,
    },
    micr: {
      type: String,
    },
  },
  {
    _id: false,
  },
);

const timeFormat = new Schema(
  {
    from: {
      type: String,
      default: '10:00',
    },
    to: {
      type: String,
      default: '10:00',
    },
  },
  {
    _id: false,
  },
);

const AvailableTime = new Schema(
  {
    monday: {
      active: {
        type: Boolean,
        default: false,
      },
      timings: {
        type: [timeFormat],
      },
    },
    tuesday: {
      active: {
        type: Boolean,
        default: false,
      },
      timings: {
        type: [timeFormat],
      },
    },
    wednesday: {
      active: {
        type: Boolean,
        default: false,
      },
      timings: {
        type: [timeFormat],
      },
    },
    thursday: {
      active: {
        type: Boolean,
        default: false,
      },
      timings: {
        type: [timeFormat],
      },
    },
    friday: {
      active: {
        type: Boolean,
        default: false,
      },
      timings: {
        type: [timeFormat],
      },
    },
    saturday: {
      active: {
        type: Boolean,
        default: false,
      },
      timings: {
        type: [timeFormat],
      },
    },
    sunday: {
      active: {
        type: Boolean,
        default: false,
      },
      timings: {
        type: [timeFormat],
      },
    },
  },
  {
    _id: false,
  },
);

const commission = new Schema(
  {
    vendor: {
      type: String,
      enum: Object.values(PROVIDER)
    },
    mode: {
      type: String,
      enum: Object.values(COMMISSION_MODES),
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  }
);

export const ProvidersSchema = new Schema({
  name:{
    type: String,
    required: true,
    minlength: [4, 'Title must be minimum 4 characters'],
    maxlength: [100, 'Title must be maximum 100 characters'],
  },
  uniqueCode:{
    type:String,
    unique:true,
    required:true
  },
  providerType : {
    type:String,
    enum: Object.values(PROVIDER_TYPES),
    required:true
  },
  servicesOffered : {
    type:String,
    enum : Object.values(SERVICES_OFFERED),
    required:true
  },
  registrationNumber : {
    type:String,
    unique:true
  },
   country: {
    type: String,
    required: true,
  },
  timezone: {
    type: String,
    // required: true,
  },
  coordinates: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  landline: {
    type: String,
    default: null,
  },
  mobileNumber: {
    unique: true,
    type: String,
  },
  photos: {
    type: [String],
  },
  documents:{
    registrationDocument: {
      type: Object,
      path: {
        type: [String],
        default: [],
      },
    },
    pollutionControlBoardCertificate:{
      type: Object,
      path: {
        type: [String],
        default: [],
      },
    },
    pancard:{
      type: Object,
      path: {
        type: [String],
        default: [],
      },
    }
  },
  commissions:{
    type:[commission]
  },
  users:{
    type:[Types.ObjectId],
  },
  accountDetails:{
    types:AccountDetails
  },
  subscriptionId:{
    type: [Types.ObjectId],
    required: true,
  },
  availableTimings: {
    type: AvailableTime,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

interface Address {
  address: string;
  city: string;
  state: string;
  zipcode: string;
}

interface AccountDetails {
  accountNumber: string;
  accountName: string;
  bankName: string;
  ifsc: string;
  micr: string;
}

interface timeFormat {
  from: string;
  to: string;
}

interface commission {
  vendor: string;
  mode: string;
  value: number;
}

interface AvailableTime {
  monday: {
    active: boolean;
    timings: [timeFormat];
  };
  tuesday: {
    active: boolean;
    timings: [timeFormat];
  };
  wednesday: {
    active: boolean;
    timings: [timeFormat];
  };
  thursday: {
    active: boolean;
    timings: [timeFormat];
  };
  friday: {
    active: boolean;
    timings: [timeFormat];
  };
  saturday: {
    active: boolean;
    timings: [timeFormat];
  };
  sunday: {
    active: boolean;
    timings: [timeFormat];
  };
};

ProvidersSchema.virtual('subscriptionDetails',{
  ref: 'subscriptions',
  localField:'subscriptionId',
  foreignField:'_id',
  justOne: true,
})

export interface providersModel extends Document {
  name:string;
  uniqueCode:string;
  providerType:string;
  servicesOffered:string;
  registrationNumber:string;
  address:Address;
  country:string;
  timezone:string;
  coordinates:string;
  email:string;
  landline:string;
  mobileNumer:string;
  photos:[string],
  documents:[string],
  commissions:[commission];
  users:[Types.ObjectId],
  accountDetails: AccountDetails;
  subscriptionId: [Types.ObjectId];
  availableTimings?: AvailableTime;
  isActive?: boolean;
  isDeleted?: boolean;
}