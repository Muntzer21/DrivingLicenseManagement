import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { Person } from 'src/person/entities/person.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';
import { Repository } from 'typeorm';
import { PersonService } from 'src/person/person.service';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
    private readonly personService : PersonService
    // private personRepository: Repository<Person>,
    
  ) {}
  async create(createApplicationDto: CreateApplicationDto, CreatedByUserID: number) {
    // here we find the app by person id and then we check if this person id hase same application type id in createApplicationDto if yes we throw error
    console.log(createApplicationDto.person);
    //createApplicationDto.person

    const app = await this.applicationRepository.findOne({
      where: { person: {PersonId:createApplicationDto.person} ,applicationType: {ApplicationTypeID:createApplicationDto.ApplicationType} },
      relations: { person: true, applicationType: true },
    });

    // const existingApp = await this.applicationRepository.findOne({
    //  where: {
    //    person: createApplicationDto.person,
    //  },
    //  relations: { person: true },
    // });
    // console.log(existingApp.person.PersonId);

    //   console.log(createApplicationDto.person);
    // console.log(existingApp.person.PersonId);
    //(app && app.ApplicationTypeID === createApplicationDto.ApplicationTypeID)
      

    if (app) {
      // console.log(app);
      
      throw new BadRequestException(
        `An application of this type already exists for the specified person.`,
      );
    }
    const person = await this.personService.findOne(createApplicationDto.person);
    if (!person) {
      throw new BadRequestException(
        `The specified person does not exist.`,
      );
    }

    // // Create and save the new application
    const newApp = await this.applicationRepository.create({
      ...createApplicationDto,
      person: { PersonId: createApplicationDto.person },
      applicationType:{ ApplicationTypeID: createApplicationDto.ApplicationType },
    });
    newApp.CreatedByUserID = CreatedByUserID; // Set the CreatedByUserID to 1 (or any other logic you want)
    await this.applicationRepository.save(newApp);

    return {
      message: 'This action adds a new application',
      application: newApp,
    };
  }

  findAll() {
    return `This action returns all applications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} application`;
  }

  update(id: number, updateApplicationDto: UpdateApplicationDto) {
    return `This action updates a #${id} application`;
  }

  remove(id: number) {
    return `This action removes a #${id} application`;
  }
}
