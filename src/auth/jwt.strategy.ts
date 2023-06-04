import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Req } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from './auth.service';
import { warn } from 'console';
// import { warn } from 'console';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private reflector: Reflector,
    private readonly authservice: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '' + process.env.JWT_SECRET,
    });
  }


  async validate(payload: any): Promise<any> {
    const requiredProperties = ['IAMUserId', 'role', 'mobileNumber'];
    if (!payload) return false;
    // const token(@Req() req:any) => (){
    //   const usertoken = req.headers.authorization.split(' ')[1];
    //   const token = await this.authService.blockToken(usertoken);
    //   if(token){
    //     true
    //   }else{
    //     false
    //   }
    // }
    // const request = context.switchToHttp().getRequest();
    // const token = this.getToken(request);
    // private getToken(request: Request) {
    //   const [_, token] = request.headers.authorization?.split(' ') ?? [];
    //   return token;
    // }
    // const jwtOpctions: StrategyOptions = {
    //   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    //   secretOrKey: '' + process.env.JWT_SECRET,
    //   passReqToCallback: true
    // }
    // console.warn(jwtOpctions);
    
    // const jwtStrategy = new Strategy(jwtOpctions, async (payload, done) => {
    //   const loggedInUserToken = payload.token
    //   // Extracted token from the request heade
    //   console.warn(loggedInUserToken);
    // });
    // console.warn(jwtStrategy);
    
    //   // Check if the logged-in user's token is present in the token blacklist
    //   const token = await this.authservice.getAllToken({ accessToken: loggedInUserToken });

    //   if (token) {
    //     true
    //     // The token is blacklisted, handle accordingly (e.g., deny access, logout the user)
    //   } else {
    //     false
    //     // The token is not blacklisted, continue with the desired logic
    //   }

    //   // ...
    // });
    // console.warn(jwtStrategy);



    // Validate if the required keys are exist in JWT Payload
    const availableProperties = requiredProperties.filter(
      (key) => payload[key],
    );
    if (availableProperties.length !== requiredProperties.length) {
      return false;
    }

    return payload;
  }
}
