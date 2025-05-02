import { Application } from "src/applications/entities/application.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'ApplicationTypes' })
export class ApplicationType {
  @PrimaryGeneratedColumn()
  ApplicationTypeID: number;
  @Column({ type: 'varchar', length: 150 })
  ApplicationTypeTitle: string;

  @Column({ type: 'integer', default: 0 })
  ApplicationFees: number;

  @OneToMany(() => Application, (application) => application.applicationType)
  application: Application;
  // application have multiple application types
  // @OneToMany(() => Application, (application) => application.applicationType)
  // app have ont to many relationship with application types
}
