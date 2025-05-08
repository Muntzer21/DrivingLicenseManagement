import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { AuthAdminGuard } from 'src/user/guards/authAdmin.guard';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @UseGuards(AuthAdminGuard)
  @Post('add-person')
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto);
  }

  @Get()
  @UseGuards(AuthAdminGuard)
  findAll(@Req() req: Request) {
    console.log(req);
    
    return this.personService.findAll();
  }

  @Get('find-person/:id')
  @UseGuards(AuthAdminGuard)
  findOne(@Param('id') id: string) {
    return this.personService.findOne(+id);
  }

  @Patch('update-person/:id')
  @UseGuards(AuthAdminGuard)
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update(+id, updatePersonDto);
  }

  @Delete('delete-person/:id')
  @UseGuards(AuthAdminGuard)
  remove(@Param('id') id: string) {
    return this.personService.remove(+id);
  }
}
