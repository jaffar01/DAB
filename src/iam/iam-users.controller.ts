import { Body, Controller, Get, HttpException, InternalServerErrorException, Param, Post, Req, SetMetadata, UseGuards } from '@nestjs/common';
import { IamService } from './iam.service';
import { AddUserDTO } from './dto/add-user.dto';
import { apiResponse } from 'src/helpers/apiresponse';
import { JWTUser } from 'src/common/interfaces/JWT-user';
import { Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/gaurds/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/gaurds/permissions.guard';

@Controller('iam-users')
@ApiBearerAuth()
@SetMetadata('MODULE', 'IAM_USERS')
export class IamUsersController {
  constructor(private readonly iamuser: IamService) { }

  @Post()
  async addUser(@Body() addUserDTO: AddUserDTO) {
    try {
      const user = await this.iamuser.registerUser(addUserDTO);
      return apiResponse(true, { user, message: 'user registered successfully' })
    } catch (err) {
      console.log(err);
      if (err instanceof HttpException) throw err;
      else
        throw new InternalServerErrorException({
          status: false,
          error: err.message,
          message: 'Unable to register the user',
        });
    }
  }

  @Get()
  @SetMetadata('ACTION', ['VIEW_ALL'])
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  async getAllUsers(){
    try {
      const users = await this.iamuser.getAllUsers();
      return apiResponse(true, {users});
    } catch (err) {
      console.log(err);
      if (err instanceof HttpException) throw err;
      else
        throw new InternalServerErrorException({
          status: false,
          error: err.message,
          message: 'Unable to get all users',
        });
    }
  }

  @Get('/user/:id?')
  @UseGuards(JwtAuthGuard)
  @SetMetadata('ACTION', ['VIEW'])
  async getUserDetails(
    @Param('id') id:string,
    @Req() request:Request
  ){
    const user = <JWTUser> request.user;
    const userId = id ? id : user.IAMUserId;
    try {
      const user = await this.iamuser.getUserDetails({userId});
      delete user.password;
      delete user.rolesId;
      return apiResponse(true,{user});
    } catch (err) {
      console.log(err);
      if (err instanceof HttpException) throw err;
      else
        throw new InternalServerErrorException({
          status: false,
          error: err.message,
          message: 'Unable to get user details',
        });
    }
  }
}


