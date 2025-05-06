import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateApplicationTypeDto } from './dto/create-application-type.dto';
import { UpdateApplicationTypeDto } from './dto/update-application-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationType } from './entities/application-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ApplicationTypesService {
  // constructor() {}
  constructor(
    @InjectRepository(ApplicationType)
    private applicationTypeRepository: Repository<ApplicationType>,
  ) {}

  /**
   * add type to applications types
   * @param createApplicationTypeDto for add new application type
   * @returns insert the new to Database
   */
  async create(createApplicationTypeDto: CreateApplicationTypeDto) {
    const newApplicationType = await this.applicationTypeRepository.findOneBy({
      ApplicationTypeTitle: createApplicationTypeDto.ApplicationTypeTitle,
    });
    if (newApplicationType) {
      return 'This applicationType already exists';
    }
    await this.applicationTypeRepository.create(createApplicationTypeDto);
    await this.applicationTypeRepository.save(createApplicationTypeDto);
    return {
      msg: 'ApplicationType created successfully',
      type: createApplicationTypeDto,
    };
  }

/**
 * 
 * @returns return applications types list
 */
  findAll() {
    return this.applicationTypeRepository.find();
  }

  /**
   * find one application type by appTypeID
   * @param ApplicationTypeID for find appType
   * @returns application type
   */
  async findOne(ApplicationTypeID: number) {
    const applicationType = await this.applicationTypeRepository.findOne({
      where: { ApplicationTypeID },
    });
    if (!applicationType) {
      throw new NotFoundException('This applicationType does not exist');
    }

    return { msg: 'ApplicationType found successfully', type: applicationType };
  }

  /**
   * update application type
   * @param ApplicationTypeID find appType by it
   * @param updateApplicationTypeDto body for update
   * @returns update AppType
   */
  async update(
    ApplicationTypeID: number,
    updateApplicationTypeDto: UpdateApplicationTypeDto,
  ) {
    const applicationType = await this.applicationTypeRepository.findOne({
      where: { ApplicationTypeID },
    });
    if (!applicationType) {
      throw new NotFoundException('This applicationType does not exist');
    }
    await this.applicationTypeRepository.merge(applicationType,updateApplicationTypeDto);
    await this.applicationTypeRepository.save(applicationType);
    return {msg : 'ApplicationType updated successfully', type: applicationType};
  }

  
}
