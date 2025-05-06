import { Injectable } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from './entities/driver.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
  ) { }
  /**
   * to add new driver to DB
   * @param personId for find person
   * @param userId USerId
   * @returns new driver to DB
   */
  async create(personId:number, userId: number) {
    const newDriver = await this.driverRepository.findOne({ where: { person: { PersonId: personId } } });
    if (newDriver) return 'This driver already exists';
    const driver = await this.driverRepository.create({
      person: { PersonId: personId },
      createdByUserID: userId,
    }); 
    await this.driverRepository.save(driver);
    return {'This action adds a new driver': driver};
  }

  findAll() {
    return `This action returns all driver`;
  }

  findOne(id: number) {
    return `This action returns a #${id} driver`;
  }

  update(id: number, updateDriverDto: UpdateDriverDto) {
    return `This action updates a #${id} driver`;
  }

  remove(id: number) {
    return `This action removes a #${id} driver`;
  }
}
