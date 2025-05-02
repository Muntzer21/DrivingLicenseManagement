
import { TestAppointment } from "src/test-appointments/entities/test-appointment.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Application } from "./application.entity";
@Entity({ name: 'LocalDrivingLicenseApplications' })
export class LocalDrivingLicenseApplication {
  @PrimaryGeneratedColumn()
  LocalDrivingLicenseApplicationID: number;

  @Column()
  ApplicationID: number; // ApplicationID

  @Column()
  LicenseClassId: number;

  @OneToMany(() => TestAppointment, (testAppoint) => testAppoint.localDrivingLicenseApplication)
  testAppointments: TestAppointment[]; // This is a self-referencing relationship
}
// @Entity({ name: 'LocalDrivingLicenseApplications' })
// export class LocalDrivingLicenseApplication {
//   @PrimaryGeneratedColumn()
//   LocalDrivingLicenseApplicationID: number;

//   @Column({ type: 'integer', default: 0 })
//   ApplicationID: number;

//   @Column({ type: 'integer', default: 0 })
//   LicenseClassId: number; // LicenseClassId
// }
