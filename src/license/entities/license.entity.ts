import { Application } from "src/applications/entities/application.entity";
import { DriverController } from "src/driver/driver.controller";
import { Driver } from "src/driver/entities/driver.entity";
import { InternationalLicense } from "src/international-license/entities/international-license.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity({ name: 'Licenses' })
export class License {
  @PrimaryGeneratedColumn()
  LicenseID: number;
  @ManyToOne(() => Application, (application) => application.license)
  @JoinColumn({ name: 'ApplicationID' })
  application: Application;
  @ManyToOne(() => Driver, (driver) => driver.license)
  @JoinColumn({ name: 'DriverID' })
  driver: Driver;

  @Column({ type: 'integer', nullable: true })
  LicenseClass: number;
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  IssureDate: Date;
  @Column({ type: 'varchar', length: 150, nullable: true })
  Notes: string;

    @Column({ type: 'integer', default: 5 })
    PaidFees: number;
  @Column({ type: 'boolean', default: true })
  IsActive: boolean;
  @Column({ type: 'integer', default: 1 }) //1-FirstTime, 2-Renew, 3-Replacement for Damaged, 4- Replacement for Lost.
  issueReason: number;
  @Column({ type: 'integer', default: 0 })
  createdByUserID: number;

  @OneToOne(() => InternationalLicense, (internationalLicense) => internationalLicense.license)
  InternationalLicense: InternationalLicense;
}
