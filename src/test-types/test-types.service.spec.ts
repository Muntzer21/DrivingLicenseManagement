import { Test, TestingModule } from '@nestjs/testing';
import { TestTypesService } from './test-types.service';

describe('TestTypesService', () => {
  let service: TestTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestTypesService],
    }).compile();

    service = module.get<TestTypesService>(TestTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
