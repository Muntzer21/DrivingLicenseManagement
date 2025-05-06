import { Test, TestingModule } from '@nestjs/testing';
import { DetainedLicensesService } from './detained-licenses.service';

describe('DetainedLicensesService', () => {
  let service: DetainedLicensesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetainedLicensesService],
    }).compile();

    service = module.get<DetainedLicensesService>(DetainedLicensesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
