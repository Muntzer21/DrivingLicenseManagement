import { ApplicationType } from "src/application-types/entities/application-type.entity";
import { InternationalLicense } from "src/international-license/entities/international-license.entity";
import { License } from "src/license/entities/license.entity";
import { Person } from "src/person/entities/person.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity({ name: 'Applications' })
export class Application {
  @PrimaryGeneratedColumn()
  ApplicationID: number;
  @ManyToOne(() => Person, (person) => person.aplications)
  // @OneToOne(() => Person, (person) => person.aplications)
  @JoinColumn({ name: 'PersonID' })
  person: Person;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  ApplicationDate: Date;

  // one application have multiple application types
  @ManyToOne(
    () => ApplicationType,
    (applicationType) => applicationType.application,
  )
  @JoinColumn({ name: 'ApplicationTypeID' })
  applicationType: ApplicationType;

  @Column({ type: 'integer', default: 1 })
  ApplicationStatus: number; // 1-New 2-Cancelled 3-Completed

  @Column({ type: 'integer', default: 15 })
  PaidFees: number; // the defualt value is 15, cost of the application and then add fees from the application type

  @Column({ type: 'integer', default: 0 })
  CreatedByUserID: number; // we can get the user id from the token and add it to the application when we create it

  @OneToMany(() => License, (license) => license.application)
  license: License; // one to one relation with license table

  @OneToOne(() => InternationalLicense, (internationalLicense) => internationalLicense.application)
  InternationalLicense: InternationalLicense; // one to one relation with international license table
}
