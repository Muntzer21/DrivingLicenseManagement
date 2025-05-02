import { Person } from "src/person/entities/person.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity({ name: 'Drivers' })
export class Driver {
    @PrimaryGeneratedColumn()
    DriverID: number;
  @OneToOne(() => Person, (person) => person.driver)
      @JoinColumn({ name: 'PersonID' })
    person: Person;

    @Column({ type: 'integer', default: 0 })
    createdByUserID: number; // we can get the user id from the token and add it to the application when we create it

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
      CreatedDate: Date;

}
