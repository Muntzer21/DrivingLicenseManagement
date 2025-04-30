import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { PersonService } from 'src/person/person.service';
import * as bcrybt from 'bcryptjs';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userReposirty: Repository<User>,
    private readonly personService: PersonService,
    private readonly jwtService: JwtService,
  ) { }
  async create(createUserDto: CreateUserDto) {
    const person = await this.personService.findOne(createUserDto.PersonId);

    if (!person) throw new NotFoundException('the person not found');

    const user = await this.userReposirty.findOne({
      where: { person: { PersonId: createUserDto.PersonId } },
    });

    if (user) {
      throw new BadRequestException('This user already exists');
    }

    const slat = await bcrybt.genSalt(10);
    const hashedPassword = await bcrybt.hash(createUserDto.Password, slat);
    createUserDto.Password = hashedPassword;
   

    let newUser = await this.userReposirty.create({
      ...createUserDto,
      person: person.person,
    });
    newUser = await this.userReposirty.save(newUser);
    
    const accessToken = await this.generateToken({ UserId: newUser.UserId, isAdmin: newUser.isAdmin });

    return { msg: 'user created successfully', user: newUser, accessToken };
  }

  async login(createUserDto: SignInDto) {


    const user = await this.userReposirty.findOne({
      where: { Username: createUserDto.Username },
    });

    if (!user) {
      throw new BadRequestException('This user not exists');
    }

    const isPasswordMatched = await bcrybt.compare(
      createUserDto.Password,
      user.Password,
    );

    if (!isPasswordMatched) {
      throw new BadRequestException('password not matched');
    }

    const accessToken = await this.generateToken({
      UserId: user.UserId,
      isAdmin: user.isAdmin,
    });


    return { msg: 'login successfully', user,accessToken };
  }

  findAll() {
    return this.userReposirty.find({
      relations: { person: true },
    });
  }
  async findOne(UserId: number) {
    const user = await this.userReposirty.findOne({
      where: { UserId },
      relations: { person: true },
    });
    if (!user) throw new NotFoundException('the user not found');
    return user;
  }

  async update(UserId: number, updateUserDto: UpdateUserDto) {
    const user = await this.userReposirty.findOne({ where: { UserId } });
    if (!user) throw new NotFoundException('the user not found');

    const updatedUser = await this.userReposirty.merge(user, updateUserDto);
    await this.userReposirty.save(updatedUser);
    return { msg: `This action updates a ${updateUserDto.Username} user`, updatedUser };
  }

  async remove(UserId: number) {
    const user = await this.userReposirty.findOne({ where: { UserId } });
    if (!user) throw new NotFoundException('the user not found');
    await this.userReposirty.delete({ UserId });
    return `The user #${user.Username} successfully deleted`;
  }

  async findCurrentUser(UserId: number) {
    const user = await this.userReposirty.findOne({
      where: { UserId },
      relations: { person: true },
    });
    if (!user) throw new NotFoundException('the user not found');
    return user;

  }

  private async generateToken(payload: any) {
    const token = await this.jwtService.signAsync(payload);
    return token;
  }
}