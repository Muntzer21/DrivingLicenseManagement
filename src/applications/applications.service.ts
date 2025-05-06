import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';
import { Repository } from 'typeorm';
import { PersonService } from 'src/person/person.service';
import { LocalDrivingLicenseApplication } from './entities/LocalDrivingLicenseApplication.entity';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
    @InjectRepository(LocalDrivingLicenseApplication)
    private localDrivingLicenseApplicationRepository: Repository<LocalDrivingLicenseApplication>,

    private readonly personService: PersonService,
    // private personRepository: Repository<Person>,
  ) { }
  
  /**
   * for add new application id DB
   * @param createApplicationDto new Application
   * @param CreatedByUser User ID
   * @returns insert new appliation to DB
   */
  async create(
    createApplicationDto: CreateApplicationDto,
    CreatedByUser: number,
  ) {
    // here we find the app by person id and then we check if this person id hase same application type id in createApplicationDto if yes we throw error

    const app = await this.applicationRepository.findOne({
      where: {
        person: { PersonId: createApplicationDto.person },
        applicationType: {
          ApplicationTypeID: createApplicationDto.ApplicationType,
        },
      },
      relations: { person: true, applicationType: true },
    });

    const localDB = await this.findLocalDLOne(app.ApplicationID);


    if (app&&localDB.LicenseClassId===createApplicationDto.LicenseClassId) {
      // console.log(app);

      throw new BadRequestException(
        `An application of this type already exists for the specified person.`,
      );
    }
    const person = await this.personService.findOne(
      createApplicationDto.person,
    );
    if (!person) {
      throw new BadRequestException(`The specified person does not exist.`);
    }


    // // Create and save the new application
    console.log(CreatedByUser);

    const newApp = await this.applicationRepository.create({
      ...createApplicationDto,
      person: { PersonId: createApplicationDto.person },
      applicationType: {
        ApplicationTypeID: createApplicationDto.ApplicationType,
      },
      CreatedByUserID: CreatedByUser,
    });
    // newApp.CreatedByUserID = CreatedByUserID; // Set the CreatedByUserID to 1 (or any other logic you want)
    await this.applicationRepository.save(newApp);

    const newLocalDLA =
      await this.localDrivingLicenseApplicationRepository.create({
        ApplicationID: newApp.ApplicationID,
        LicenseClassId: createApplicationDto.LicenseClassId,
      });

    await this.localDrivingLicenseApplicationRepository.save(newLocalDLA);

    return {
      message: 'This action adds a new application',
      application: newApp,
      localDrivingLicenseApplication: newLocalDLA,
    };
  }

  /**
   * find one application By appID
   * @param applicationId for find application 
   * @returns application
   */
  findone(applicationId: number) {
    return this.applicationRepository.findOne({
      where: { ApplicationID: applicationId },
      relations: { person: true, applicationType: true },
    });
  }

  findAll() {
    return `This action returns all applications`;
  }

  /**
   * find local driving license by application id
   * @param id application id for find local driving license
   * @returns local driving license
   */
  findLocalDLOne(id: number) {
    return this.localDrivingLicenseApplicationRepository.findOne({
      where: { ApplicationID: id },
      // relations: { application: true },
    });
  }

  update(id: number, updateApplicationDto: UpdateApplicationDto) {
    return `This action updates a #${id} application`;
  }

  remove(id: number) {
    return `This action removes a #${id} application`;
  }
}
