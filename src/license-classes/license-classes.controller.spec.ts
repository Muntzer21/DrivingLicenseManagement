import { Test, TestingModule } from '@nestjs/testing';
import { LicenseClassesController } from './license-classes.controller';
import { LicenseClassesService } from './license-classes.service';

describe('LicenseClassesController', () => {
  let controller: LicenseClassesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LicenseClassesController],
      providers: [LicenseClassesService],
    }).compile();

    controller = module.get<LicenseClassesController>(LicenseClassesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
