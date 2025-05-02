import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTestAppointmentDto } from './dto/create-test-appointment.dto';
import { UpdateTestAppointmentDto } from './dto/update-test-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TestAppointment } from './entities/test-appointment.entity';
import { Repository } from 'typeorm';
import { LocalDrivingLicenseApplication } from 'src/applications/entities/LocalDrivingLicenseApplication.entity';
import { TestType } from 'src/test-types/entities/test-type.entity';
import { TestTypesService } from 'src/test-types/test-types.service';

@Injectable()
export class TestAppointmentsService {
  // constructor() {}
  constructor(
    @InjectRepository(TestAppointment)
    private testappointmentRepository: Repository<TestAppointment>,
    private readonly testTypeService : TestTypesService
  ) {}
  async create(createTestAppointmentDto: CreateTestAppointmentDto, userId: number) {
    const testAppointment = await this.testappointmentRepository.findOne({
      where: {
        localDrivingLicenseApplication: { LocalDrivingLicenseApplicationID: createTestAppointmentDto.localDrivingLicenseApplication },
        testType: { TestTypeID: createTestAppointmentDto.testType },
     
      }, relations: {testType: true, localDrivingLicenseApplication: true}
    });
    if (testAppointment) {
      return 'This testAppointment already exists';
    }

     const testAppointmentPerson = await this.testappointmentRepository.findOne({
       where: {
         localDrivingLicenseApplication: {
           LocalDrivingLicenseApplicationID:
             createTestAppointmentDto.localDrivingLicenseApplication,
         },
        
       },
       relations: {  localDrivingLicenseApplication: true },
     });

    if (testAppointmentPerson!==null&& !testAppointmentPerson.isLocked) {
      throw new BadRequestException('This person can not take next test but if pass this test');
    }

    const testTyp = await this.testTypeService.findOne(createTestAppointmentDto.testType);
    
    const newTestAppointment = await this.testappointmentRepository.create({
      ...createTestAppointmentDto,
      localDrivingLicenseApplication: {
        LocalDrivingLicenseApplicationID:
          createTestAppointmentDto.localDrivingLicenseApplication,
      },
      testType: { TestTypeID: createTestAppointmentDto.testType },
      CreatedByUserID: userId,
      testAppointmentFees: testTyp.TestTypeFees,
    });

    await this.testappointmentRepository.save(newTestAppointment);
    return { 'This action adds a new testAppointment': newTestAppointment };
    return 'This action adds a new testAppointment';
  
  }
    
    // testAppointment.localDrivingLicenseApplication
  

  findAll() {
    return `This action returns all testAppointments`;
  }

  findOne(id: number) {
    return this.testappointmentRepository.findOne({
      where: { TestAppointmentID: id },relations:{testType: true, localDrivingLicenseApplication: true}
    });
  }

  update(id: number, updateTestAppointmentDto: UpdateTestAppointmentDto) {
    return `This action updates a #${id} testAppointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} testAppointment`;
  }

  public async itsTaketest(id: number) {

    const testAppointment = await this.testappointmentRepository.findOne({
      where: { TestAppointmentID: id },
    });
    testAppointment.isLocked = true;
    await this.testappointmentRepository.save(testAppointment);



  }
}
