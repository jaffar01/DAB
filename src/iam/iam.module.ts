import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IamRolesController } from './iam-roles.controller';
import { IamUsersController } from './iam-users.controller';
import { IamUsersSchema } from './entities/iam-users.schema';
import { IamRolesSchema } from './entities/iam-roles.schema';
import { IamService } from './iam.service';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: 'iam-roles', schema: IamRolesSchema }]),
    MongooseModule.forFeature([{ name: 'iam-users', schema: IamUsersSchema }]),

  ],
  controllers: [IamRolesController, IamUsersController],
  providers: [IamService],
  exports: [IamService],
})
export class IamModule {}
