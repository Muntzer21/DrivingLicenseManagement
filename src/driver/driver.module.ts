import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './entities/driver.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Driver])], // Add your entities here
  controllers: [DriverController],
  providers: [DriverService],
  exports: [DriverService], // Export the service if needed in other modules

})
export class DriverModule {}
