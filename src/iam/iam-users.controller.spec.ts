import { Test, TestingModule } from '@nestjs/testing';
import { IamUsersController } from './iam-users.controller';

describe('IamUsersController', () => {
  let controller: IamUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IamUsersController],
    }).compile();

    controller = module.get<IamUsersController>(IamUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
