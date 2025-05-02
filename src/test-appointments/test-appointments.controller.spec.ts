import { Test, TestingModule } from '@nestjs/testing';
import { TestAppointmentsController } from './test-appointments.controller';
import { TestAppointmentsService } from './test-appointments.service';

describe('TestAppointmentsController', () => {
  let controller: TestAppointmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestAppointmentsController],
      providers: [TestAppointmentsService],
    }).compile();

    controller = module.get<TestAppointmentsController>(TestAppointmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
