import { Body, Controller, HttpException, InternalServerErrorException, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticationDTO } from './dto/AuthenticationDTO';
import { apiResponse } from 'src/helpers/apiresponse';
import { TokenBlockListDTO } from './dto/tokenBlockList.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService:AuthService) {}

  @Post('login')
  async doAuthentication(
    @Body() authenticationDTO: AuthenticationDTO,
  ):Promise<any>{
    try {
      const [error,user] = await this.authService.doAuthentication(authenticationDTO);
      if (error) return apiResponse(false, { error });
      return apiResponse(true, { user });
    } catch (err) {
      console.error(err);
      if (err instanceof HttpException) throw err;
      else
        throw new InternalServerErrorException({
          status: false,
          error: err,
          message: err.message ? err.message : 'Unable to authenticate the user',
        });
    }
  }

  @Post('logout')
  async blockToken(@Req() req:any){
    try {
      const usertoken = req.headers.authorization.split(' ')[1];
      const token = await this.authService.blockToken(usertoken);
      return apiResponse(true, { token });
    } catch (err) {
      console.error(err);
      if (err instanceof HttpException) throw err;
      else
        throw new InternalServerErrorException({
          status: false,
          error: err,
          message: err.message ? err.message : 'Unable to block the token',
        });
    }
  }
}


