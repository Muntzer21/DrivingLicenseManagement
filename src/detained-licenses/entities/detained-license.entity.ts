import { License } from "src/license/entities/license.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity({ name: 'DetainedLicenses' })
export class DetainedLicense {
  @PrimaryGeneratedColumn()
    DetainID: number;
    @ManyToOne(() => License, (license) => license.DetainedLicense)
    @JoinColumn({ name: 'LicenseID' })
    license: License;
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    DetainedDate: Date;
    @Column({ type: 'boolean', default: false })
    isReleased: boolean; // if the license is released or not
    @Column({ type: 'integer', default: 0 })
    FindFees: number; // the fees for the detain
    @Column({ type: 'integer', default: 0 })
    createdByUserID: number; // user id who created the license
}
