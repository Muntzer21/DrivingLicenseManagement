import { Application } from "src/applications/entities/application.entity";
import { Driver } from "src/driver/entities/driver.entity";
import { License } from "src/license/entities/license.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity({name:'InternationalLicenses'})
export class InternationalLicense {
  @PrimaryGeneratedColumn()
    InternationalLicenseID: number;
    @OneToOne(() => Application, (application) => application.InternationalLicense)
        @JoinColumn({ name: 'ApplicationID' })
    application: Application;

    @OneToOne(()=>Driver,(driver)=>driver.InternationalLicense)
    @JoinColumn({ name: 'DriverID' })
    driver: Driver;


    @OneToOne(() => License, (license) => license.InternationalLicense)
    @JoinColumn({ name: 'LicenseID' })
    license: License;

     @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    IssureDate: Date;
    
    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @Column({type:'integer',default:0})
    createdByUserID: number; // user id who created the license

    
}
