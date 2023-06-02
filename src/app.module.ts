import { Module } from '@nestjs/common';
// import { IamController } from './iam/iam.controller';
// import { IamService } from './iam/iam.service';
import { IamModule } from './iam/iam.module';
// import { AuthController } from './auth/auth.controller';
// import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_URI, {}),
    IamModule, AuthModule
  ],
  // controllers: [ IamController, AuthController],
  // providers: [ IamService, AuthService],
})
export class AppModule {}
