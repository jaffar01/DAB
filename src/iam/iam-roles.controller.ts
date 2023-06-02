import { Body, Controller, HttpException, InternalServerErrorException, Post } from '@nestjs/common';
import { IamService } from './iam.service';
import { AddRoleDto } from './dto/add-role.dto';
import { apiResponse } from 'src/helpers/apiresponse';

@Controller('iam-roles')
export class IamRolesController {
  constructor(private readonly iamService: IamService) {}

  @Post('/addRole')
  async addRole(@Body() addRoleDto: AddRoleDto) {
    try {
      const role = await this.iamService.addRole(addRoleDto);
      return apiResponse(true, { role });
    } catch (err) {
      console.log(err);
      if(err instanceof HttpException) throw err;
      else
      throw new InternalServerErrorException({
        status:false,
        error:err.message,
        message: 'Unable to register new role'
      })
    }
  }
}
