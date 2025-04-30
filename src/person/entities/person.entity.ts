import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Gender } from "../enums/geneder";
import { User } from "src/user/entities/user.entity";

@Entity({ name: 'people' })
export class Person {
  @PrimaryGeneratedColumn()
  PersonId: number;
  @Column({ type: 'varchar', length: 50, unique: true })
  NationalNo: string;
  @Column({ type: 'varchar', length: 50 })
  Firstname: string;
  @Column({ type: 'varchar', length: 50 })
  Secondname: string;
  @Column({ type: 'varchar', length: 50 })
  Thridname: string;
  @Column({ type: 'varchar', length: 50 })
  Lastname: string;

  @Column({ type: 'enum', enum: Gender, default: Gender.Male })
  gender: Gender;

  // @Column({ type: 'date', nullable: true }) // Use 'date' type for dateOfBirth
  // dateOfBirth: Date; // This will map to a Date object in TypeScript

  @Column({ type: 'varchar', length: 50 })
  Nationality: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  Address: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  email: string;
  @Column({ type: 'varchar', length: 50, unique: true })
  phone: string;

  @OneToOne(() => User, (user) => user.person)
  user: User; // This will hold the related User entity
}
