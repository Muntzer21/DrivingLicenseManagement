import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { TestAppointmentsService } from './test-appointments.service';
import { CreateTestAppointmentDto } from './dto/create-test-appointment.dto';
import { UpdateTestAppointmentDto } from './dto/update-test-appointment.dto';
import { AuthAdminGuard } from 'src/user/guards/authAdmin.guard';

@Controller('test-appointments')
export class TestAppointmentsController {
  constructor(private readonly testAppointmentsService: TestAppointmentsService) {}

  @Post('add-test-appointment')
    @UseGuards(AuthAdminGuard)
  create(@Body() createTestAppointmentDto: CreateTestAppointmentDto, @Req() req: Request) {
    const userId = req['user'].UserId; // Assuming the user ID is stored in the request object after authentication
    return this.testAppointmentsService.create(createTestAppointmentDto,userId);
  }

  @Get()
  findAll() {
    return this.testAppointmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testAppointmentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestAppointmentDto: UpdateTestAppointmentDto) {
    return this.testAppointmentsService.update(+id, updateTestAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testAppointmentsService.remove(+id);
  }
}
