import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSION_TYPES } from '../../iam/iam.constants';
import { JWTUser } from 'src/common/interfaces/JWT-user';
import { IamService } from 'src/iam/iam.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly iamService: IamService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: JWTUser = request.user;
    const email = user.email;
    const mobileNumber = user.mobileNumber;
    
    // Get the user role & permissions
    const userDetails = await this.iamService.getUserDetails({
      email,
      mobileNumber
    });
    if (!userDetails) return false;

    let permissions = [];
    userDetails?.roleDetails?.map((roleDetail) => permissions.push(...roleDetail.permissions));
    if (!permissions) return false;

    // Get the required module and action permission from meta data
    const module = this.reflector.get<string>('MODULE', context.getClass());
    const actions = this.reflector.get<string[]>(
      'ACTION',
      context.getHandler(),
    );

    const modulePermission = permissions.find(
      (permission) =>
        permission.type === PERMISSION_TYPES.MODULE_PERMISSION &&
        permission.moduleKey === module,
    );
    if (!modulePermission) return false;

    const actionsPermitted = modulePermission.actionsPermitted;
    const isPermittedAction = actions.find((action) =>
      actionsPermitted.includes(action),
    );

    return !!isPermittedAction;
  }
}
