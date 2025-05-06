import { Test, TestingModule } from '@nestjs/testing';
import { DetainedLicensesController } from './detained-licenses.controller';
import { DetainedLicensesService } from './detained-licenses.service';

describe('DetainedLicensesController', () => {
  let controller: DetainedLicensesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetainedLicensesController],
      providers: [DetainedLicensesService],
    }).compile();

    controller = module.get<DetainedLicensesController>(DetainedLicensesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
