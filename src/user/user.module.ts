import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Person } from 'src/person/entities/person.entity';
import { PersonModule } from 'src/person/person.module';
import { PersonService } from 'src/person/person.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PersonModule,
     JwtModule.registerAsync({
          inject: [ConfigService],
          useFactory: (config: ConfigService)=>
          {
            
           return {
             global: true,
             secret: config.get<string>('JWT_SECRET'),
             signOptions: {
               expiresIn: config.get<string>('JWT_EXPIRATION'),
             },
           };
          },
        }),
  
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
