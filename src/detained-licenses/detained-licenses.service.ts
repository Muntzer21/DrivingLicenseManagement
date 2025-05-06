import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDetainedLicenseDto } from './dto/create-detained-license.dto';
import { UpdateDetainedLicenseDto } from './dto/update-detained-license.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DetainedLicense } from './entities/detained-license.entity';
import { Repository } from 'typeorm';
import { LicenseService } from 'src/license/license.service';

@Injectable()
export class DetainedLicensesService {
  // constructor() {}
  constructor(
    @InjectRepository(DetainedLicense)
    private detainedLicenseRepository: Repository<DetainedLicense>,
    private readonly licenseService: LicenseService,
  ) {}

  /**
   * for detained the license 
   * @param createDetainedLicenseDto body for detain
   * @param userId user ID
   * @returns retained the license
   */
  async create(
    createDetainedLicenseDto: CreateDetainedLicenseDto,
    userId: number,
  ) {
    const detainLicense = await this.detainedLicenseRepository.findOne({
      where: { license: { LicenseID: createDetainedLicenseDto.LicenseID } },
      relations: { license: true },
    });
    if (detainLicense)
      throw new BadRequestException('This detainedLicense already exists');

    let newDetainedLicense = await this.detainedLicenseRepository.create({
      ...createDetainedLicenseDto,
      license: { LicenseID: createDetainedLicenseDto.LicenseID },
      createdByUserID: userId,
    });
    await this.licenseService.makeFalse(createDetainedLicenseDto.LicenseID); // here we include service to update the license to inactive

    newDetainedLicense =
      await this.detainedLicenseRepository.save(newDetainedLicense);
    return { 'tone detained the license sucessfully': newDetainedLicense };
  }

  /**
   * for relaised the license 
   * @param detainID for find the detained license
   * @returns relaised the license
   */
  async relaseLicense(detainID: number) {
    const detainLicense = await this.detainedLicenseRepository.findOne({
      where: { DetainID: detainID },
      relations: { license: true },
    });
    if (!detainLicense)
      throw new BadRequestException('This detainedLicense does not exist');

    const updateDetainedLicense = await this.detainedLicenseRepository.update(
      { DetainID: detainLicense.DetainID },
      {
        isReleased: true,
      },
    );
    await this.licenseService.makeTrue(detainLicense.license.LicenseID); // here we include service to update the license to inactive

    // newDetainedLicense =
    //   await this.detainedLicenseRepository.save(newDetainedLicense);
    return { 'relased license sucessfully': updateDetainedLicense };
  }

  findAll() {
    return `This action returns all detainedLicenses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detainedLicense`;
  }

  update(id: number, updateDetainedLicenseDto: UpdateDetainedLicenseDto) {
    return `This action updates a #${id} detainedLicense`;
  }

  remove(id: number) {
    return `This action removes a #${id} detainedLicense`;
  }
}
