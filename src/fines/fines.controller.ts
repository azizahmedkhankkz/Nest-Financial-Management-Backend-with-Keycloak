import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FinesService } from './fines.service';
import { CreateFineDto } from './dto/create-fine.dto';
import { UpdateFineDto } from './dto/update-fine.dto';
import { Resource, RoleMatchingMode, Roles, Unprotected } from 'nest-keycloak-connect';

@Controller('fines')
export class FinesController {
  constructor(private readonly finesService: FinesService) {}

  @Post()
  // @Unprotected()
  @Roles({ roles: ['user','admin'] })
  create(@Body() createFineDto: CreateFineDto) {
    console.log('body: ',createFineDto);
    return this.finesService.create(createFineDto);
  }

  @Get()
  @Roles({ roles: ['user','admin'] })
  findAll() { 
    return this.finesService.findAll();
  }

  
  @Get('paid')
  @Roles({ roles: ['user','admin'] })
  findAllByUsers() { 
    return this.finesService.getPaidFines();
  }

  
  @Get('/count')
  @Roles({ roles: ['user','admin'] })
  async getCount() { 
    const fines = await this.finesService.getCount()
    return {fines};
  }

  @Get('id/:id')
  @Roles({ roles: ['user','admin'] })
  findOne(@Param('id') id: string) {
    return this.finesService.findOneById(id);
  }

  @Get('name/:name')
  @Roles({ roles: ['user','admin'] })
  findOneByFilter(@Param('name') name: number) {
    return this.finesService.findOneByName({name});
  }

  @Patch('id/:id')
  // @Unprotected()
  @Roles({ roles: ['user','admin'] })
  updateById(@Param('id') id: string, @Body() updateFineDto: UpdateFineDto) {
    return this.finesService.findAndUpdateById(id, updateFineDto);
  }

  @Patch('pay-fine/id/:id')
  // @Unprotected()
  @Roles({ roles: ['user','admin'] })
  payFine(@Param('id') id: string) {
    return this.finesService.payFine(id);
  }

  @Patch('name/:name')
  @Roles({ roles: ['user','admin'] })
  updateByName(@Param('name') name: string, @Body() updateFineDto: UpdateFineDto) {
    return this.finesService.findAndUpdateByName({'name': name}, updateFineDto);
  }

  @Delete(':id')
  @Roles({ roles: ['user','admin'] })
  remove(@Param('id') id: string) {
    return this.finesService.remove(id);
  }
}
