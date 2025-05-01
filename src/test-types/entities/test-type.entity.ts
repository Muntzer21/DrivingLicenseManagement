import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
