import { Test, TestingModule } from '@nestjs/testing';
import { TestAppointmentsService } from './test-appointments.service';

describe('TestAppointmentsService', () => {
  let service: TestAppointmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestAppointmentsService],
    }).compile();

    service = module.get<TestAppointmentsService>(TestAppointmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
