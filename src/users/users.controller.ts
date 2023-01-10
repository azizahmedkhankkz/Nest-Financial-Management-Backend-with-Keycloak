import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Resource, RoleMatchingMode, Roles, Unprotected } from 'nest-keycloak-connect';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles({ roles: ['user','admin'] })
  create(@Body() createUserDto: CreateUserDto) {
    console.log('body: ',createUserDto);
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles({ roles: ['user','admin'] })
  findAll() { 
    return this.usersService.findAll();
  }

  @Get('/count')
  @Roles({ roles: ['user','admin'] })
  async getCount() { 
    const users = await this.usersService.getCount()
    return {users};
  }

  @Get('id/:id')
  @Roles({ roles: ['user','admin'] })
  findOne(@Param('id') id: string) {
    return this.usersService.findOneById(id);
  }

  @Get('name/:name')
  @Roles({ roles: ['user','admin'] })
  findOneByFilter(@Param('name') name: number) {
    return this.usersService.findOneByName({name});
  }

  @Patch('id/:id')
  @Roles({ roles: ['user','admin'] })
  updateById(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.findAndUpdateById(id, updateUserDto);
  }

  @Patch('name/:name')
  @Roles({ roles: ['user','admin'] })
  updateByName(@Param('name') name: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.findAndUpdateByName({'name': name}, updateUserDto);
  }

  @Delete(':id')
  @Roles({ roles: ['user','admin'] })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
