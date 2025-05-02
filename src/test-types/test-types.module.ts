import { Module } from '@nestjs/common';
import { TestTypesService } from './test-types.service';
import { TestTypesController } from './test-types.controller';
import { TestType } from './entities/test-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([TestType]),JwtModule],
  controllers: [TestTypesController],
  providers: [TestTypesService],
  exports:[TestTypesService],
})
export class TestTypesModule {}
