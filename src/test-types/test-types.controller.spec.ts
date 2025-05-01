import { Test, TestingModule } from '@nestjs/testing';
import { TestTypesController } from './test-types.controller';
import { TestTypesService } from './test-types.service';

describe('TestTypesController', () => {
  let controller: TestTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestTypesController],
      providers: [TestTypesService],
    }).compile();

    controller = module.get<TestTypesController>(TestTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
