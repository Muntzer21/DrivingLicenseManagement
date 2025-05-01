import { Test, TestingModule } from '@nestjs/testing';
import { LicenseClassesService } from './license-classes.service';

describe('LicenseClassesService', () => {
  let service: LicenseClassesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LicenseClassesService],
    }).compile();

    service = module.get<LicenseClassesService>(LicenseClassesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
