import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { ApplicationTypesService } from './application-types.service';
import { CreateApplicationTypeDto } from './dto/create-application-type.dto';
import { UpdateApplicationTypeDto } from './dto/update-application-type.dto';
import { AuthAdminGuard } from 'src/user/guards/authAdmin.guard';

@Controller('application-types')
export class ApplicationTypesController {
  constructor(
    private readonly applicationTypesService: ApplicationTypesService,
  ) {}

  @UseGuards(AuthAdminGuard)
  @Post('add-new-application-type')
  create(@Body() createApplicationTypeDto: CreateApplicationTypeDto) {
    return this.applicationTypesService.create(createApplicationTypeDto);
  }

  @Get('get-application-types')
  @UseGuards(AuthAdminGuard)
  findAll() {
    // return 'ok';
    return this.applicationTypesService.findAll();
  }

  @Get('get-application-type/:id')
  @UseGuards(AuthAdminGuard)
  findOne(@Param('id') id: string) {
    return this.applicationTypesService.findOne(+id);
  }

  @Patch('update-application-type/:id')
  @UseGuards(AuthAdminGuard)
  update(
    @Param('id') id: string,
    @Body() updateApplicationTypeDto: UpdateApplicationTypeDto,
  ) {
    return this.applicationTypesService.update(+id, updateApplicationTypeDto);
  }
}
