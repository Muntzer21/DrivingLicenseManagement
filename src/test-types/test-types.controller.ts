import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TestTypesService } from './test-types.service';
import { CreateTestTypeDto } from './dto/create-test-type.dto';
import { UpdateTestTypeDto } from './dto/update-test-type.dto';
import { AuthAdminGuard } from 'src/user/guards/authAdmin.guard';

@Controller('test-types')
export class TestTypesController {
  constructor(private readonly testTypesService: TestTypesService) {}

  @Post('add-new-test-type')
  @UseGuards(AuthAdminGuard)
  create(@Body() createTestTypeDto: CreateTestTypeDto) {
    return this.testTypesService.create(createTestTypeDto);
  }

  @UseGuards(AuthAdminGuard)
  @Get('get-test-types')
  findAll() {
    // return 'ok';
    return this.testTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testTypesService.findOne(+id);
  }

 
}
