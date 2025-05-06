import { Injectable } from '@nestjs/common';
import { CreateTestTypeDto } from './dto/create-test-type.dto';
import { UpdateTestTypeDto } from './dto/update-test-type.dto';
import { Repository } from 'typeorm';
import { TestType } from './entities/test-type.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TestTypesService {
  // constructor() {}
  // constructor(
  //   @InjectRepository(TestType)
  //   private testTypeRepository: Repository<TestType>,
  // ) {}
  constructor(
    @InjectRepository(TestType)
    private readonly testTypeRepository: Repository<TestType>,
  ) { }
  
  /**
   * add new test type to list
   * @param createTestTypeDto body new test type
   * @returns new test type
   */
  async create(createTestTypeDto: CreateTestTypeDto) {
    const newTestType =await this.testTypeRepository.findOneBy({
      TestTypeTitle: createTestTypeDto.TestTypeTitle,
    });
    if (newTestType) {
      return 'This testType already exists';
    }
   await this.testTypeRepository.create(createTestTypeDto);
   await this.testTypeRepository.save(createTestTypeDto);


    return {'This action adds a new testType': createTestTypeDto};
  }

  findAll() {
    return this.testTypeRepository.find();
  }

  /**
   * find one test type 
   * @param id for find test type by test type id
   * @returns test type 
   */
  findOne(id: number) {
    return this.testTypeRepository.findOne({
      where: { TestTypeID: id }
    });
  }

  
}
