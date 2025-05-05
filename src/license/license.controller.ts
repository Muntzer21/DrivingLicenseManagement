import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { LicenseService } from './license.service';
import { CreateLicenseDto } from './dto/create-license.dto';
import { UpdateLicenseDto } from './dto/update-license.dto';
import { AuthAdminGuard } from 'src/user/guards/authAdmin.guard';

@Controller('license')
export class LicenseController {
  constructor(private readonly licenseService: LicenseService) {}

  @UseGuards(AuthAdminGuard)
  @Post('issue-license')
  create(@Body() createLicenseDto: CreateLicenseDto, @Req() req: Request) {
    const userId = req['user'].UserId; // Assuming the user ID is stored in the request object after authentication
    return this.licenseService.create(createLicenseDto, userId);
  }

  //Replacement for Damaged
  @UseGuards(AuthAdminGuard)
  @Post('replacement-license-for-damaged/:licenseId')
  replacementForDamaged(
    @Param('licenseId') licenseId: string,
    @Req() req: Request,
  ) {
    const userId = req['user'].UserId; // Assuming the user ID is stored in the request object after authentication
    return this.licenseService.createLicenseForDamaged(+licenseId, userId);
  }

  //Replacement for Damaged or Lost Licenses
  @UseGuards(AuthAdminGuard)
  @Post('replacement-license-for-lost/:licenseId')
  replacementForLost(
    @Param('licenseId') licenseId: string,
    @Req() req: Request,
  ) {
    const userId = req['user'].UserId; // Assuming the user ID is stored in the request object after authentication
    return this.licenseService.createLicenseForLost(+licenseId, userId);
  }

  @Get()
  findAll() {
    return this.licenseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.licenseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLicenseDto: UpdateLicenseDto) {
    return this.licenseService.update(+id, updateLicenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.licenseService.remove(+id);
  }
}
