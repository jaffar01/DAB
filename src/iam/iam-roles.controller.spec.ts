import { Test, TestingModule } from '@nestjs/testing';
import { IamRolesController } from './iam-roles.controller';

describe('IamRolesController', () => {
  let controller: IamRolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IamRolesController],
    }).compile();

    controller = module.get<IamRolesController>(IamRolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
