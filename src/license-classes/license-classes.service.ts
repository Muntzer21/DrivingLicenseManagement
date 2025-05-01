import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLicenseClassDto } from './dto/create-license-class.dto';
import { UpdateLicenseClassDto } from './dto/update-license-class.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LicenseClass } from './entities/license-class.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LicenseClassesService {
  // constructor() {}
  constructor(
    @InjectRepository(LicenseClass)
    private licenseClassRepository: Repository<LicenseClass>,
  ) {}
  async create(createLicenseClassDto: CreateLicenseClassDto) {
    const newLicenseClass = await this.licenseClassRepository.findOneBy({
      ClassName: createLicenseClassDto.ClassName,
    });
    if (newLicenseClass) {
      return 'This licenseClass already exists';
    }
    await this.licenseClassRepository.create(createLicenseClassDto);
    await this.licenseClassRepository.save(createLicenseClassDto);
    return { 'This action adds a new licenseClass': createLicenseClassDto };
  }

  findAll() {
    return this.licenseClassRepository.find();
  }

  async findOne(LicenseClassID: number) {
    const licenseClass = await this.licenseClassRepository.findOne({
      where: { LicenseClassID },
    });
    if (!licenseClass) {
      throw new NotFoundException('This licenseClass does not exist');
    }
    return licenseClass;
  }

  update(id: number, updateLicenseClassDto: UpdateLicenseClassDto) {
    return `This action updates a #${id} licenseClass`;
  }

  remove(id: number) {
    return `This action removes a #${id} licenseClass`;
  }
}
