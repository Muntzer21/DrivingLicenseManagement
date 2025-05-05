import { InternationalLicense } from "src/international-license/entities/international-license.entity";
import { License } from "src/license/entities/license.entity";
import { Person } from "src/person/entities/person.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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

  @OneToMany(() => License, (license) => license.driver)
  license: License; // here we put one to many because one driver can have many licenses

  @OneToOne(() => InternationalLicense, (inter) => inter.InternationalLicenseID)
  InternationalLicense: InternationalLicense; // here we put one to many because one driver can have many licenses
}
