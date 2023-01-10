import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FineTypesService } from './fine-types.service';
import { CreateFineTypeDto } from './dto/create-fine-type.dto';
import { UpdateFineTypeDto } from './dto/update-fine-type.dto';
import { Roles, Unprotected } from 'nest-keycloak-connect';

@Controller('fine-types')
export class FineTypesController {
  constructor(private readonly fineTypesService: FineTypesService) {}

  @Post()
  // @Unprotected()
  @Roles({ roles: ['user','admin'] })
  create(@Body() createFineTypeDto: CreateFineTypeDto) {
    console.log('body: ',createFineTypeDto);
    return this.fineTypesService.create(createFineTypeDto);
  }

  @Get()
  @Roles({ roles: ['user','admin'] })
  findAll() { 
    return this.fineTypesService.findAll();
  }

  @Get('id/:id')
  @Roles({ roles: ['user','admin'] })
  findOne(@Param('id') id: string) {
    return this.fineTypesService.findOneById(id);
  }

  @Get('name/:name')
  @Roles({ roles: ['user','admin'] })
  findOneByFilter(@Param('name') name: number) {
    return this.fineTypesService.findOneByName({name});
  }

  @Patch('id/:id')
  @Roles({ roles: ['user','admin'] })
  updateById(@Param('id') id: string, @Body() updateFineTypeDto: UpdateFineTypeDto) {
    return this.fineTypesService.findAndUpdateById(id, updateFineTypeDto);
  }

  @Patch('name/:name')
  @Roles({ roles: ['user','admin'] })
  updateByName(@Param('name') name: string, @Body() updateFineTypeDto: UpdateFineTypeDto) {
    return this.fineTypesService.findAndUpdateByName({'name': name}, updateFineTypeDto);
  }

  @Delete(':id')
  @Roles({ roles: ['user','admin'] })
  remove(@Param('id') id: string) {
    return this.fineTypesService.remove(id);
  }
}
