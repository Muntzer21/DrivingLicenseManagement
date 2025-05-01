import { Application } from "src/applications/entities/application.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'ApplicationTypes' })
export class ApplicationType {
  @PrimaryGeneratedColumn()
  ApplicationTypeID: number;
  @Column({ type: 'varchar', length: 150 })
  ApplicationTypeTitle: string;

  @Column({ type: 'integer', default: 0 })
  ApplicationFees: number;

  @OneToOne(() => Application, (application) => application.applicationType)
  application: Application;
}
