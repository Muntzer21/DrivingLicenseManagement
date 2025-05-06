import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateInternationalLicenseDto } from './dto/create-international-license.dto';
import { UpdateInternationalLicenseDto } from './dto/update-international-license.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { InternationalLicense } from './entities/international-license.entity';
import { Repository } from 'typeorm';
import { LicenseService } from 'src/license/license.service';

@Injectable()
export class InternationalLicenseService {
  // constructor() {}
  constructor(
    @InjectRepository(InternationalLicense)
    private internationalLicenseRepository: Repository<InternationalLicense>,
    private readonly licenseService: LicenseService,
  ) {}

  /**
   * to insert new International License
   * @param createInternationalLicenseDto body new international license
   * @param userId UserID
   * @returns new international license in DB
   */
  async create(
    createInternationalLicenseDto: CreateInternationalLicenseDto,
    userId: number,
  ) {
    const internationalLicense =
      await this.internationalLicenseRepository.findOne({
        where: {
          license: { LicenseID: createInternationalLicenseDto.licenseID },
        },
      });
    if (internationalLicense)
      throw new BadRequestException('This internationalLicense already exists');
    const license = await this.licenseService.findOne(
      createInternationalLicenseDto.licenseID,
    );

    if (license.LicenseClass !== 3)
      throw new BadRequestException(
        'the international license can only be issued for class 3 and the license class id for this person is ' +
          license.LicenseClass,
      );
    // console.log(license.application);

    let newInternationalLicense =
      await this.internationalLicenseRepository.create({
        ...createInternationalLicenseDto,
        createdByUserID: userId,
        license: { LicenseID: createInternationalLicenseDto.licenseID },
        application: { ApplicationID: license.application.ApplicationID },
        driver: { DriverID: license.driver.DriverID },
      });

    newInternationalLicense = await this.internationalLicenseRepository.save(
      newInternationalLicense,
    );
    // we dont issue a international license but if driver type class ===3
    return {
      'This action adds a new internationalLicense': newInternationalLicense,
    };
  }

  findAll() {
    return `This action returns all internationalLicense`;
  }

  findOne(id: number) {
    return `This action returns a #${id} internationalLicense`;
  }

  update(
    id: number,
    updateInternationalLicenseDto: UpdateInternationalLicenseDto,
  ) {
    return `This action updates a #${id} internationalLicense`;
  }

  remove(id: number) {
    return `This action removes a #${id} internationalLicense`;
  }
}
