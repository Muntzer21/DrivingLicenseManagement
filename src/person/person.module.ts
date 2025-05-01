import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Person } from './entities/person.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Person]),JwtModule],
  controllers: [PersonController],
  providers: [PersonService],
  exports:[PersonService,TypeOrmModule],
})
export class PersonModule {}
