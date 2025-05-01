import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationTypesService } from './application-types.service';

describe('ApplicationTypesService', () => {
  let service: ApplicationTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplicationTypesService],
    }).compile();

    service = module.get<ApplicationTypesService>(ApplicationTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
