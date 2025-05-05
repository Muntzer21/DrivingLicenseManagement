import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { InternationalLicenseService } from './international-license.service';
import { CreateInternationalLicenseDto } from './dto/create-international-license.dto';
import { UpdateInternationalLicenseDto } from './dto/update-international-license.dto';
import { AuthAdminGuard } from 'src/user/guards/authAdmin.guard';

@Controller('international-license')
export class InternationalLicenseController {
  constructor(private readonly internationalLicenseService: InternationalLicenseService) {}

  @Post('issue-international-license')
    @UseGuards(AuthAdminGuard)
  create(@Body() createInternationalLicenseDto: CreateInternationalLicenseDto, @Req() req: Request) {
    const userId = req['user'].UserId; // Assuming the user ID is stored in the request object after authentication
    return this.internationalLicenseService.create(createInternationalLicenseDto, userId);
  }

  @Get()
  findAll() {
    return this.internationalLicenseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.internationalLicenseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInternationalLicenseDto: UpdateInternationalLicenseDto) {
    return this.internationalLicenseService.update(+id, updateInternationalLicenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.internationalLicenseService.remove(+id);
  }
}
