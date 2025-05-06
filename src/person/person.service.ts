import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person) private readonly personReposirty: Repository<Person>,
  ) { }
  /**
   * add new person in DB 
   * @param createPersonDto body new person 
   * @returns new pseron in DB
   */
  async create(createPersonDto: CreatePersonDto) {
    const person = await this.personReposirty.findOneBy({ NationalNo: createPersonDto.NationalNo });
    if (person) {
      return 'This person already exists';
    }
    const newPerson = await this.personReposirty.create(createPersonDto);
    await this.personReposirty.save(newPerson);
    return {"the person added successfully": newPerson};
  }

  findAll() {
    return this.personReposirty.find();
  }

  /**
   * find one person by person id 
   * @param id for find person by person id
   * @returns person
   */
  async findOne(id: number) {
   const person = await this.personReposirty.findOne({
     where: { PersonId: id },
   });
    if (!person) throw new NotFoundException('Person not found');
    return {msg:"the user exists", person};
  }

  /**
   * update person in DB
   * @param PersonId for find person 
   * @param updatePersonDto for update person 
   * @returns update person
   */
  async update(PersonId: number, updatePersonDto: UpdatePersonDto) {
    const person = await this.personReposirty.findOne({ where: { PersonId } });
    
    if (!person) throw new NotFoundException('Person not found');
    const updatedPerson = await this.personReposirty.merge(person, updatePersonDto);
    await this.personReposirty.save(updatedPerson);
    return {msg:`The updates sucessfully for a #${person.Firstname} `, updatedPerson};
  }

  /**
   * delete person in DB
   * @param id for find person by person id
   * @returns delete person in DB
   */
  async remove(id: number) {
    const person = await this.personReposirty.findOne({ where: { PersonId: id } });
    if(!person) throw new NotFoundException('Person not found');
    await this.personReposirty.delete(id);
    return `the person its deleted successfully`;
  }
}
