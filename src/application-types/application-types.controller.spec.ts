import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationTypesController } from './application-types.controller';
import { ApplicationTypesService } from './application-types.service';

describe('ApplicationTypesController', () => {
  let controller: ApplicationTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationTypesController],
      providers: [ApplicationTypesService],
    }).compile();

    controller = module.get<ApplicationTypesController>(ApplicationTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
