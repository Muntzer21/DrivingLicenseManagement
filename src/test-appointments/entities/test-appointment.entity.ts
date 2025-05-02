import { Test } from "@nestjs/testing";
import { LocalDrivingLicenseApplication } from "src/applications/entities/LocalDrivingLicenseApplication.entity";
import { TestType } from "src/test-types/entities/test-type.entity";
import { Tests } from "src/tests/entities/test.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity({ name: 'TestAppointments' })
export class TestAppointment {
  @PrimaryGeneratedColumn()
  TestAppointmentID: number;
  @ManyToOne(() => TestType, (testType) => testType.testAppointments)
  @JoinColumn({ name: 'testTypeID' })
    testType: TestType;
    
  @ManyToOne(
    () => LocalDrivingLicenseApplication,
    (localDLA) => localDLA.testAppointments,
  )
  @JoinColumn({ name: 'LocalDrivingLicenseApplicationID' })
  localDrivingLicenseApplication: LocalDrivingLicenseApplication;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  testAppiontmentDate: Date;
  @Column({ type: 'integer', default: 5 })
  testAppointmentFees: number;

  @Column({ type: 'integer', default: 0 })
  CreatedByUserID: number; // we can get the user id from the token and add it to the application when we create it

  @Column({ type: 'boolean', default: false })
  isLocked: boolean; // if true thats its pass test

  @OneToOne(() => Tests, (test) => test.testAppointment)
  test: Tests; // one test appointment have one test
}
