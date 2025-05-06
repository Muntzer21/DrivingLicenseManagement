import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLicenseDto } from './dto/create-license.dto';
import { UpdateLicenseDto } from './dto/update-license.dto';
import { License } from './entities/license.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { application } from 'express';
import { ApplicationsModule } from 'src/applications/applications.module';
import { ApplicationsService } from 'src/applications/applications.service';
import { NotFoundError } from 'rxjs';

@Injectable()
export class LicenseService {
  // constructor() {}
  constructor(
    @InjectRepository(License)
    private licenseRepository: Repository<License>,
    private readonly applicationService: ApplicationsService,
  ) { }
  
  /**
   * to insert new license in DB
   * @param createLicenseDto body the new license
   * @param userId User ID
   * @returns New License in DB
   */
  async create(createLicenseDto: CreateLicenseDto, userId: number) {
    const license = await this.licenseRepository.findOne({
      where: { application: { ApplicationID: createLicenseDto.applicationId } },
    });
    if (license) return 'This license already exists';
    const application = await this.applicationService.findone(
      createLicenseDto.applicationId,
    );
    const localDrivingLicenseApplication =
      await this.applicationService.findLocalDLOne(
        createLicenseDto.applicationId,
      );
    let newLicense = await this.licenseRepository.create({
      ...createLicenseDto,
      application: { ApplicationID: createLicenseDto.applicationId },
      createdByUserID: userId,
      driver: { DriverID: createLicenseDto.driverId },
      PaidFees: application.PaidFees,
      LicenseClass: localDrivingLicenseApplication.LicenseClassId,
    });
    newLicense = await this.licenseRepository.save(newLicense);
    return { 'This action adds a new license': newLicense };
  }

  /**
   * for license for damaeged
   * @param licenseID for replace it
   * @param userId UserID
   * @returns new License replace for damaged
   */
  async createLicenseForDamaged(licenseID: number, userId: number) {
    const license = await this.licenseRepository.findOne({
      where: { LicenseID: licenseID },
      relations: { application: true, driver: true },
    });
    if (!license) throw new NotFoundException('This license does not exist');
    const licenseRep = license;
    await this.licenseRepository.update(
      { LicenseID: licenseID }, // Find the license by ID
      { IsActive: false },
    );

    licenseRep.LicenseID = null;
    licenseRep.issueReason = 4; // for damaged license

    let newLicense = await this.licenseRepository.create({
      ...licenseRep,
      createdByUserID: userId,
      application: { ApplicationID: license.application.ApplicationID },
      driver: { DriverID: license.driver.DriverID },
    });
    newLicense = await this.licenseRepository.save(newLicense);
    return { 'This action adds a new license': newLicense };
  }

  /**
   * for license for lost
   * @param licenseID for replace it
   * @param userId User ID
   * @returns new License replace for lost
   */
  async createLicenseForLost(licenseID: number, userId: number) {
    const license = await this.licenseRepository.findOne({
      where: { LicenseID: licenseID },
      relations: { application: true, driver: true },
    });
    if (!license) throw new NotFoundException('This license does not exist');
    const licenseRep = license;
    await this.licenseRepository.update(
      { LicenseID: licenseID }, // Find the license by ID
      { IsActive: false },
    );

    licenseRep.LicenseID = null;
    licenseRep.issueReason = 4; // for lost license

    let newLicense = await this.licenseRepository.create({
      ...licenseRep,
      createdByUserID: userId,
      application: { ApplicationID: license.application.ApplicationID },
      driver: { DriverID: license.driver.DriverID },
    });
    newLicense = await this.licenseRepository.save(newLicense);
    return { 'This action adds a new license': newLicense };
  }

  makeTrue(licenseID: number) {
    return this.licenseRepository.update(
      { LicenseID: licenseID }, // Find the license by ID
      { IsActive: true },
    );
  }

  makeFalse(licenseID: number) {
    return this.licenseRepository.update(
      { LicenseID: licenseID }, // Find the license by ID
      { IsActive: false },
    );
  }

  findAll() {
    return `This action returns all license`;
  }

  findOne(id: number) {
    return this.licenseRepository.findOne({
      where: { LicenseID: id },
      relations: { application: true, driver: true },
    });
  }

  update(id: number, updateLicenseDto: UpdateLicenseDto) {
    return `This action updates a #${id} license`;
  }

  remove(id: number) {
    return `This action removes a #${id} license`;
  }
}
