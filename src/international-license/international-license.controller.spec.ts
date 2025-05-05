import { Test, TestingModule } from '@nestjs/testing';
import { InternationalLicenseController } from './international-license.controller';
import { InternationalLicenseService } from './international-license.service';

describe('InternationalLicenseController', () => {
  let controller: InternationalLicenseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InternationalLicenseController],
      providers: [InternationalLicenseService],
    }).compile();

    controller = module.get<InternationalLicenseController>(InternationalLicenseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
