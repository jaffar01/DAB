import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private reflector: Reflector,
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
