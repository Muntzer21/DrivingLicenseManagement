import { TestAppointment } from "src/test-appointments/entities/test-appointment.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity({ name: 'Tests' })
export class Tests {
    @PrimaryGeneratedColumn()
    TestID: number;

    @OneToOne(() => TestAppointment, (testAppoin) => testAppoin.test)
    @JoinColumn({name: 'TestAppointmentID'})
    testAppointment: TestAppointment; // This is a self-referencing relationship

    @Column({ type: 'boolean', default: false } )
    testResult: boolean; // true if the test is positive, false if the test is negative

    @Column({ type: 'varchar', length: 150, nullable: true })
    notes: string; // notes about the test result

    @Column({ type: 'integer', default: 0 })
    createdByUserID: number; // we can get the user id from the token and add it to the test when we create it
}
