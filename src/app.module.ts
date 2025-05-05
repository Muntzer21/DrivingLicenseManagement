import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { PersonModule } from './person/person.module';
import { ApplicationTypesModule } from './application-types/application-types.module';
import { TestTypesModule } from './test-types/test-types.module';
import { LicenseClassesModule } from './license-classes/license-classes.module';
import { ApplicationsModule } from './applications/applications.module';
import { Application } from './applications/entities/application.entity';
import { LocalDrivingLicenseApplication } from './applications/entities/LocalDrivingLicenseApplication.entity';
import { TestAppointmentsModule } from './test-appointments/test-appointments.module';
import { TestsModule } from './tests/tests.module';
import { DriverModule } from './driver/driver.module';
import { LicenseModule } from './license/license.module';
import { InternationalLicenseModule } from './international-license/international-license.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.development',
    }),
    UserModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          database: config.get<string>('DB_DATABASE'),
          username: config.get<string>('DB_USERNAME'),
          password: config.get<string>('DB_PASSWORD'),
          port: config.get<number>('DB_PORT'),
          host: 'localhost',
          synchronize: true, //only in development envirment
          entities: ['dist/**/*.entity{.ts,.js}'],
        };
      },
    }),
    PersonModule,
    ApplicationTypesModule,
    TestTypesModule,
    LicenseClassesModule,
    ApplicationsModule,
    TestAppointmentsModule,
    TestsModule,
    DriverModule,
    LicenseModule,
    InternationalLicenseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
