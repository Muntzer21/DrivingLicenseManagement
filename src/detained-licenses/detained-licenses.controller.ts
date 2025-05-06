import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { DetainedLicensesService } from './detained-licenses.service';
import { CreateDetainedLicenseDto } from './dto/create-detained-license.dto';
import { UpdateDetainedLicenseDto } from './dto/update-detained-license.dto';
import { AuthAdminGuard } from 'src/user/guards/authAdmin.guard';

@Controller('detained-licenses')
export class DetainedLicensesController {
  constructor(
    private readonly detainedLicensesService: DetainedLicensesService,
  ) {}

  @Post('add-detained-licenses')
  @UseGuards(AuthAdminGuard)
  create(
    @Body() createDetainedLicenseDto: CreateDetainedLicenseDto,
    @Req() req: Request,
  ) {
    const userId = req['user'].UserId; // Assuming the user ID is stored in the request object after authentication
    return this.detainedLicensesService.create(
      createDetainedLicenseDto,
      userId,
    );
  }

  @Post('relased-license/:detainedId')
  @UseGuards(AuthAdminGuard)
  relasedLicense( @Param('detainedId') detained: number, ) {
    return this.detainedLicensesService.relaseLicense(detained);
  }

  @Get()
  findAll() {
    return this.detainedLicensesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detainedLicensesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDetainedLicenseDto: UpdateDetainedLicenseDto,
  ) {
    return this.detainedLicensesService.update(+id, updateDetainedLicenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detainedLicensesService.remove(+id);
  }
}
