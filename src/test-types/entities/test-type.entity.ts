import { TestAppointment } from "src/test-appointments/entities/test-appointment.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'TestTypes' })
export class TestType {
  @PrimaryGeneratedColumn()
  TestTypeID: number;
  @Column({ type: 'varchar', length: 150 })
  TestTypeTitle: string;
  @Column({ type: 'varchar', length: 500 })
  TestTypeDescription: string;
  @Column({ type: 'integer', default: 0 })
  TestTypeFees: number;

  @OneToMany(() => TestAppointment, (testAppoint) => testAppoint.testType)
  testAppointments: TestType[]; // This is a self-referencing relationship
}
