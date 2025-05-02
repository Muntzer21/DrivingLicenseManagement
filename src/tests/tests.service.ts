import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tests } from './entities/test.entity';
import { Repository } from 'typeorm';
import { TestAppointmentsService } from 'src/test-appointments/test-appointments.service';
import { TestType } from 'src/test-types/entities/test-type.entity';
import { DriverService } from 'src/driver/driver.service';
import { ApplicationsService } from 'src/applications/applications.service';

@Injectable()
export class TestsService {
  // constructor() {}
  constructor(
    @InjectRepository(Tests)
    private testsRepository: Repository<Tests>, private readonly testAppointmentService: TestAppointmentsService,private readonly applicationService : ApplicationsService
    ,private readonly driverService: DriverService
  ) { }
  async create(createTestDto: CreateTestDto, userId: number) {
    const test = await this.testsRepository.findOne({ where: { testAppointment: { TestAppointmentID: createTestDto.testAppointmentID } } });
    if (test) throw new BadRequestException('This test already exists');
    const newTest = await this.testsRepository.create({ ...createTestDto, testAppointment: { TestAppointmentID: createTestDto.testAppointmentID }, createdByUserID: userId });
    await this.testsRepository.save(newTest);
    await this.testAppointmentService.itsTaketest(createTestDto.testAppointmentID); // here we put true  in locked in test appointment table

    // here we issure driver
    const testApp = await this.testAppointmentService.findOne(createTestDto.testAppointmentID);
    const applicationId = testApp.localDrivingLicenseApplication.ApplicationID;
    const app = await this.applicationService.findone(applicationId);
    
    // here we put true  in locked in test appointment table
    if (testApp.testType.TestTypeID === 3 && testApp.isLocked) {
      {
        // here we issure driver
        await this.driverService.create(app.person.PersonId, userId);
        // we stopped it becuase we don't have person id
        


        // await this.testAppointmentService.updateTestAppointment(createTestDto.testAppointmentID,testApp);
      }

      return { 'This action adds a new test': newTest };
    }
  }

    findAll() {
      return `This action returns all tests`;
    }

    findOne(id: number) {
      return `This action returns a #${id} test`;
    }

    update(id: number, updateTestDto: UpdateTestDto) {
      return `This action updates a #${id} test`;
    }

    remove(id: number) {
      return `This action removes a #${id} test`;
    }
  }
