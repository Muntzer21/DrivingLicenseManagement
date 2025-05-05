import { Test, TestingModule } from '@nestjs/testing';
import { InternationalLicenseService } from './international-license.service';

describe('InternationalLicenseService', () => {
  let service: InternationalLicenseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InternationalLicenseService],
    }).compile();

    service = module.get<InternationalLicenseService>(InternationalLicenseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
