import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IamService } from 'src/iam/iam.service';
import { AuthenticationDTO } from './dto/AuthenticationDTO';
import { compare } from 'bcrypt';
import { useContainer } from 'class-validator';
import { ROLES } from 'src/constants';
import { TokenBlockListDTO } from './dto/tokenBlockList.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TokenBlockListModule } from './entities/TokenBlockList.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('token-blockList')
    private readonly tokenBlockListModel : Model<TokenBlockListModule>,
    private iamService: IamService, 
    private jwtService: JwtService) { }

  async doAuthentication(authenticationDTO: AuthenticationDTO): Promise<any> {
    const iamUserDetails = await this.iamService.getUserDetails({
      email: authenticationDTO.email,
      mobileNumber: authenticationDTO.mobileNumber
    });

    if (!iamUserDetails)
      throw new HttpException('Unable to find this user in our records', 400);
    // if (!iamUserDetails.isEmailVerified)
    //   throw new HttpException('Email is not verified yet!', 400);
    if (!iamUserDetails.isActive)
      throw new HttpException('Your account has been disabled', 400);

    if (authenticationDTO.password) {
      if (!(await compare(authenticationDTO.password, iamUserDetails.password))) {
        throw new HttpException('Invalid password', 400);
      }
    }

    let role;
    if (iamUserDetails) {
      const roleDetails = iamUserDetails?.roleDetails?.find((roleDetails) =>
        Object.values(ROLES).includes(roleDetails.key),
      );
      role = roleDetails?.key;
    }

    const userInfo = {
      IAMUserId: iamUserDetails._id,
      fullName: iamUserDetails.name,
      email: iamUserDetails.email,
      mobileNumber: iamUserDetails.mobileNumber,
      role: role,
      accessToken: this.jwtService.sign({
        IAMUserId: iamUserDetails._id,
        role: role,
        mobileNumber: iamUserDetails.mobileNumber
      }),
    }

    return [null, userInfo]

  }

  async blockToken(usertoken) {
    try {
      if(!usertoken) throw new HttpException('token not available', 400);
      const blockedToken = await this.tokenBlockListModel.create({
        token : usertoken
      });
      return blockedToken;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getAllToken({
    accessToken=null
  }){
    try {
      const token = await this.tokenBlockListModel.findOne({
        token:accessToken
      });
      console.warn(token);
      
      return token
    } catch (err) {
      throw new Error(err);
    }
  }
}
