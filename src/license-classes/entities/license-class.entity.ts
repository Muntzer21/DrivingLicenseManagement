import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity({ name: 'LicenseClasses' })
export class LicenseClass {
    @PrimaryGeneratedColumn()
    LicenseClassID: number;
    @Column({ type: 'varchar', length: 150 })
    ClassName: string;
    @Column({ type: 'varchar', length: 350 })
    ClassDescription: string;
    @Column({ type: 'integer', default: 0 })
    ClassFees: number;
    @Column({ type: 'integer', default: 0 })
    DefaultValidityLength: number;
}
