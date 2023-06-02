import { Injectable, HttpException, forwardRef, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { IamRolesModel } from './entities/iam-roles.schema';
import { IamUsersModel } from './entities/iam-users.schema';
import { AddUserDTO } from './dto/add-user.dto';
import { ValidateJSON } from './../helpers/json-validation.helper';
import { permissionValidationSchema } from './helpers/permission-schema';
import { ROLES } from 'src/constants';
import { AddRoleDto } from './dto/add-role.dto';
import { PERMISSION_TYPES } from './iam.constants';

@Injectable()
export class IamService {
  constructor(
    @InjectModel('iam-roles')
    private readonly iamRolesModel: Model<IamRolesModel>,
    @InjectModel('iam-users')
    private readonly iamUsersModel: Model<IamUsersModel>,
  ){}


  /**
   * Add a new role
   */
  async addRole(addRoleDto: AddRoleDto) {
    try {
      // Parse permissions details value
      const permissions = JSON.parse(addRoleDto.permissions);
      const [isValid] = ValidateJSON(permissionValidationSchema, permissions);
      if (!isValid)
        throw new HttpException('Permission contains incorrect value', 400);
      const modulePermissions = permissions.map((permission) => ({
        ...permission,
        type: PERMISSION_TYPES.MODULE_PERMISSION,
      }));

      const roles = await this.iamRolesModel.create({
        name: addRoleDto.name,
        key: addRoleDto.key,
        description: addRoleDto.description,
        permissions: modulePermissions,
      });

      return roles;
    } catch (err) {
      console.error('ERROR', err);
      throw new Error(err);
    }
  }

  /**
   * Register a new user in IAM
   */
  async registerUser(
    iamUserRegistrationDTO: AddUserDTO,
  ): Promise<any> {
    let encryptedPassword = null;
    let roles, deliveryAddress, favouriteProducts, favouriteVendors;
    if (iamUserRegistrationDTO.password) {
      encryptedPassword = bcrypt.hashSync(
        iamUserRegistrationDTO.password,
        parseInt(process.env.PASSWORD_HASH_SALT_ROUND),
      );
    }

    let iamRolesId = [];
    if (iamUserRegistrationDTO.roles) {
      roles = JSON.parse(iamUserRegistrationDTO.roles);
      const rolesIds = roles?.map(async (role) => {
        const roleDetails = await this.getRoleDetails({ role });
        iamRolesId.push(roleDetails?._id);
      });
      await Promise.all(rolesIds);
    }
    try {
      const iamUser = await this.iamUsersModel.create({
        name: iamUserRegistrationDTO.name || null,
        email: iamUserRegistrationDTO.email,
        mobileNumber: iamUserRegistrationDTO.mobileNumber,
        password: encryptedPassword,
        country: iamUserRegistrationDTO.country || null,
        rolesId: iamRolesId,
      });
      await delete iamUser.password;
      return iamUser;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Get all or individual IAM Role details
   */
  async getRoleDetails({ role }): Promise<any> {
    try {
      if (role) return await this.iamRolesModel.findOne({ key: role });
      else return await this.iamRolesModel.find();
    } catch (err) {
      console.error('ERROR', err);
      throw new Error(err);
    }
  }

 /******
  * Get all users details
  */
 async getAllUsers(){
  try {
    const users = await this.iamUsersModel.find({isDeleted:false}).select('-password');
    return users;
  } catch (err) {
    throw new Error(err);
  }
 }

 /****
  * get a user details by one of below unique properties
  * 1. email 2.mobileNumber 3. userid
  **/
 async getUserDetails({
  email= null,
  mobileNumber = null,
  userId = null
 }){
  try {
    const filter: any = {};
    if (email && email.length !== 0){
      filter.email = email;
    }
    if (mobileNumber && mobileNumber.length !== 0){
      filter.mobileNumber = mobileNumber;
    }
    if (userId && userId.length !== 0){
      filter._id = new Types.ObjectId(userId);
    }
    const userDetails = <IamUsersModel & {roleDetails:Array<IamRolesModel>}>await this.iamUsersModel.findOne({
      ...filter,
      isActive:true,
      isDeleted:false
    })
    .populate('roleDetails')
    .lean();
    return userDetails;
  } catch (err) {
   throw new Error(err);
  }
 }
}
