import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { IamModule } from 'src/iam/iam.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenBlackListSchema } from './entities/TokenBlockList.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{name: 'token-blockList', schema:TokenBlackListSchema}]),
    PassportModule,
    JwtModule.register({
      secret: '' + process.env.JWT_SECRET,
      signOptions: { expiresIn: '2d' },
    }),
    forwardRef(() => IamModule),
  ],
  controllers:[AuthController],
  providers:[AuthService,JwtStrategy],
  exports:[AuthService]
})
export class AuthModule {}
