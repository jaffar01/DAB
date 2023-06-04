import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IamService } from 'src/iam/iam.service';
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service';
import { providersModel } from './entities/provider.schema';
import { Model, Types } from 'mongoose';
import { AddProviderDTO } from './dto/add-provider.dto';
import { ROLES } from 'src/constants';
import { JWTUser } from 'src/common/interfaces/JWT-user';
import { generateUniqueCode } from './helper/uniqueCode_helper';
import { updateProviderDTO } from './dto/update-provider.dto';

@Injectable()
export class ProviderService {
  constructor(
    @Inject(forwardRef(() => IamService))
    private iamService: IamService,
    @Inject(forwardRef(() => SubscriptionsService))
    private subscriptionsService: SubscriptionsService,
    @InjectModel('providers')
    private readonly providerModel: Model<providersModel>,
  ) { }

  // create the provider from the DB
  async registerProvider(addProvider: AddProviderDTO, files) {
    let address, availableTimings, isNewuniqueCode, accountDetails, subscriptionId, commissions
    let roles = [ROLES.PROVIDER];
    if (addProvider.address) address = JSON.parse(addProvider.address);
    if (addProvider.availableTimings) availableTimings = JSON.parse(addProvider.availableTimings);
    if (addProvider.commissions) commissions = JSON.parse(addProvider.commissions);
    if (addProvider.accountDetails) accountDetails = JSON.parse(addProvider.accountDetails);
    // if(addProvider.subscriptionPlan)

    // Generating new unique code for the provider
    const newUniqueCode = generateUniqueCode({
      providerType: addProvider.providerType,
      name: addProvider.name,
      uniqueNumber: await this.getUniqueNumber(),
      isNewuniqueCode
    })

    //getting subscription details
    try {
      subscriptionId = await this.subscriptionsService.registerSubscription({
        plan: addProvider.subscriptionPlan,
        validity: addProvider.subscriptionValidity,
        startDate: addProvider.subscriptionEndDate,
        endDate: addProvider.subscriptionEndDate,
        paymentStatus: addProvider.subscriptionPaymentStatus
      });
      if (!subscriptionId) return ['Unable to create Subscription']
    } catch (err) {
      throw new Error(err)
    }

    // const [coordinatesError, coordinates] = await getLatLongFromAddress(
    //   address.address,
    // );
    // if (coordinatesError)
    //   throw new HttpException("Con't able to get location from Address", 400);

    // Get timezone from latLong of the address
    // const [timezoneError, timezone] = await getTimezoneFromLatLong(
    //   `${coordinates.latitude},${coordinates.longitude}`,
    // );
    // if (timezoneError) throw new HttpException('Timezone error', 400);


    // documents storing in s3-bucket
    // const documents = [
    //   'photos',
    //   're',
    //   'taxIdDocument',
    //   'contractDocument',
    //   'insuranceDocument',
    //   'identityProof',
    // ];
    // let documentLocations = {};

    // if (files) {
    //   await Promise.all(
    //     documents.map(async (document) => {
    //       const docs = files[document];
    //       console.log(docs);
    //       if (docs) {
    //         if (Array.isArray(docs)) {
    //           await Promise.all(
    //             docs.map(async (doc) => {
    //               const path = await uploadtoS3({
    //                 fileData: doc.data,
    //                 fileName: doc.name,
    //                 folder: 'vendors',
    //               });
    //               if (documentLocations[document])
    //                 documentLocations[document].push(path);
    //               else documentLocations[document] = [path];
    //             }),
    //           );
    //         } else {
    //           const path = await uploadtoS3({
    //             fileData: docs.data,
    //             fileName: docs.name,
    //             folder: 'vendors',
    //           });
    //           documentLocations[document] = [path];
    //         }
    //       }
    //     }),
    //   );
    // }

    try {
      const provider = await this.providerModel.create({
        name: addProvider.name,
        uniqueCode: newUniqueCode,
        providerType: addProvider.providerType,
        servicesOffered: addProvider.servicesOffered,
        registrationNumber: addProvider.registrationNumber,
        address: addProvider.address || null,
        country: addProvider.country,
        timezone: null,
        coordinates: null,
        email: addProvider.email,
        landline: addProvider.landline,
        mobileNumer: addProvider.mobileNumber,
        // photos:addProvider.photos,
        // documents:addProvider.documents
        commissions: commissions,
        accountDetails: addProvider.accountDetails,
        subscriptionId: subscriptionId,
        availableTimings: availableTimings,
        isActive: true,
        isDeleted: false

      });
      if (!provider) return [{ message: 'Unable to create provider' }];

      //admin user creation
      try {
        const userDetails = await this.iamService.registerUser({
          name: addProvider.adminUserName,
          email: addProvider.adminUserEmail,
          country: addProvider.adminUserCountry,
          mobileNumber: addProvider.adminUserMobileNumber,
          password: addProvider.adminUserPassword,
          roles: JSON.stringify(roles),
          providerId: provider._id.toString()
        });
        if (!userDetails) {
          await this.deleteProvider(provider._id);
          return [{ message: 'Unable to create user' }]
        }
      } catch (err) {
        console.log(err);
        throw new Error(err);
      }
      return [null, provider]
    } catch (err) {
      throw new Error(err);
    }

  }

  // getting the uniqueNumber from last provider
  async getUniqueNumber() {
    const provider = await this.providerModel
      .find({
        isDeleted: false,
      })
      .limit(1)
      .sort({ _id: -1 });
    if (provider && provider.length !== 0) {
      return provider[0].uniqueCode.split('-').slice(-1);
    } else {
      return undefined;
    }
  }

  async updateProviderDetails(
    user: JWTUser = null,
    providerId,
    updateProviderDTO: updateProviderDTO
  ) {
    let address,
      accountDetails,
      availableTimings,
      subscriptionId,
      subscription,
      commissions,
      timezone,
      coordinatesError,
      timezoneError,
      coordinates,
      users;

    const role = user?.role;
    try {
      const provider = await this.providerModel.findOne({
        _id: new Types.ObjectId(providerId),
        isDeleted: false
      });
      accountDetails = updateProviderDTO.accountDetails ? JSON.parse(updateProviderDTO.accountDetails) : provider.accountDetails;
      availableTimings = updateProviderDTO.availableTimings ? JSON.parse(updateProviderDTO.availableTimings) : provider.availableTimings;
      address = updateProviderDTO.address ? JSON.parse(updateProviderDTO.address) : provider.address;
      commissions = updateProviderDTO.commissions ? JSON.parse(updateProviderDTO.commissions) : provider.commissions;

      // [coordinatesError, coordinates] = await getLatLongFromAddress(
      //   address.address,
      // );
      // if (coordinatesError)
      //   throw new HttpException(
      //     "Con't able to get location from Address",
      //     400,
      //   );

      // // Get timezone from latLong of the address
      // [timezoneError, timezone] = await getTimezoneFromLatLong(
      //   `${coordinates.latitude},${coordinates.longitude}`,
      // );
      // if (timezoneError) throw new HttpException('Timezone error', 400);

      if (updateProviderDTO.users) {
        users = JSON.parse(updateProviderDTO.users);
      }

      // updating the subscription details
      try {
        if (updateProviderDTO.subscriptionId) {
          subscription = await this.subscriptionsService.updateSubscriptionDetails({
            subscriptionId: updateProviderDTO.subscriptionId
          }, {
            plan: updateProviderDTO.subscriptionPlan,
            validity: updateProviderDTO.subscriptionValidity,
            startDate: updateProviderDTO.subscriptionStartDate,
            endDate: updateProviderDTO.subscriptionEndDate,
            paymentStatus: updateProviderDTO.subscriptionPaymentStatus
          });
          subscriptionId = subscription._id;
        }
      } catch (err) {
        throw new Error(err);
      }
      if ((updateProviderDTO.providerType && updateProviderDTO.providerType !== provider.providerType) || (updateProviderDTO.name && updateProviderDTO.name !== provider.name)) {
        const newUniqueCode = await generateUniqueCode({
          providerType: updateProviderDTO.providerType ? updateProviderDTO.providerType : provider.providerType,
          name: updateProviderDTO.name ? updateProviderDTO.name : provider.name,
          uniqueNumber: provider.uniqueCode.split('-').slice(-1),
          isNewuniqueCode: false
        });
        provider.uniqueCode = newUniqueCode;
      }

      if (role === ROLES.ADMIN) {
        if (updateProviderDTO.email && updateProviderDTO.email !== updateProviderDTO.email) {
          provider.email = updateProviderDTO.email
        }
        if (
          updateProviderDTO.mobileNumber && updateProviderDTO.mobileNumber !== provider.mobileNumer
        ) {
          provider.mobileNumer = updateProviderDTO.mobileNumber;
        }
        provider.commissions = commissions;
        //
      }
      if (updateProviderDTO.providerType) provider.providerType = updateProviderDTO.providerType;
      if (updateProviderDTO.name) provider.name = updateProviderDTO.name;
      if (updateProviderDTO.servicesOffered) provider.servicesOffered = updateProviderDTO.servicesOffered;
      if (updateProviderDTO.registrationNumber) provider.registrationNumber = updateProviderDTO.registrationNumber;
      if (updateProviderDTO.address) provider.address = address;
      if (updateProviderDTO.country) provider.country = updateProviderDTO.country;
      if (updateProviderDTO.landline) provider.landline = updateProviderDTO.landline;
      if (updateProviderDTO.mobileNumber) provider.mobileNumer = updateProviderDTO.mobileNumber;
      if (updateProviderDTO.subscriptionId) provider.subscriptionId = subscriptionId;
      if (updateProviderDTO.availableTimings) provider.availableTimings = availableTimings;
      if (updateProviderDTO.accountDetails) provider.accountDetails = accountDetails;
      if (updateProviderDTO.users) {
        provider.doctors.push(...users?.ma((user) => new Types.ObjectId(user)));
      }
      provider.save();
      return provider;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }

  }

  // delete provider
  async deleteProvider(providerId) {
    try {
      const provider = await this.providerModel.findOne({
        _id: new Types.ObjectId(providerId),
        isActive: true,
        isDeleted: false
      });
      if (provider && provider !== null) {
        provider.isActive = false;
        provider.isDeleted = true;
        provider.save();
        return { message: 'provider is deleted' };
      } else {
        return { message: 'Unable to delete provider' }
      }
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }
}
