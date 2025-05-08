import { Person } from "src/person/entities/person.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity('Users') // This decorator marks the class as a database entity and specifies the table name
export class User {
  @PrimaryGeneratedColumn()
  UserId: number;
  @Column({ type: 'varchar', length: 50 })
  Username: string;
  @Column({ type: 'varchar', length: 150 }) // This column will not be selected by default
  Password: string;
  @Column({ default: false }) // Default value set to true
  isAdmin: boolean;

  @OneToOne(() => Person, (person) => person.user)
 @JoinColumn({name:'PersonId'}) // This decorator indicates that this side owns the relationship
 person: Person; // This will hold the related Person entity
}
