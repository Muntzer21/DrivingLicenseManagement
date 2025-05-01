import { Module } from '@nestjs/common';
import { ApplicationTypesService } from './application-types.service';
import { ApplicationTypesController } from './application-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationType } from './entities/application-type.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicationType]),JwtModule],
  controllers: [ApplicationTypesController],
  providers: [ApplicationTypesService],
})
export class ApplicationTypesModule {}
