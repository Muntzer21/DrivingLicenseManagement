import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from './guards/auth.guard';
import { SignInDto } from './dto/sign-in.dto';
import { AuthAdminGuard } from './guards/authAdmin.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('sign-in')
  login(@Body() createUserDto: SignInDto) {
    return this.userService.login(createUserDto);
  }

  @UseGuards(AuthAdminGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('CurrentUser')
  @UseGuards(AuthGuard)
  getCurrentUser(@Req() req: Request) {
    const payload = req['user'];
    return this.userService.findCurrentUser(payload.id);
  }

  @UseGuards(AuthAdminGuard)
  @Get('find-user/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @UseGuards(AuthAdminGuard)
  @Patch('update-user/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @UseGuards(AuthAdminGuard)
  @Delete('delete-user/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
