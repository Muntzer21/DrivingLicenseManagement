import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LicenseClassesService } from './license-classes.service';
import { CreateLicenseClassDto } from './dto/create-license-class.dto';
import { UpdateLicenseClassDto } from './dto/update-license-class.dto';
import { AuthAdminGuard } from 'src/user/guards/authAdmin.guard';

@Controller('license-classes')
export class LicenseClassesController {
  constructor(private readonly licenseClassesService: LicenseClassesService) {}

  @UseGuards(AuthAdminGuard)
  @Post('add-license-class')
  create(@Body() createLicenseClassDto: CreateLicenseClassDto) {
    return this.licenseClassesService.create(createLicenseClassDto);
  }
  @UseGuards(AuthAdminGuard)
  @Get('get-license-classes')
  findAll() {
    return this.licenseClassesService.findAll();
  }

  @Get('get-one-license-class/:id')
  findOne(@Param('id') id: string) {
    return this.licenseClassesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLicenseClassDto: UpdateLicenseClassDto,
  ) {
    return this.licenseClassesService.update(+id, updateLicenseClassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.licenseClassesService.remove(+id);
  }
}
