import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Resource, RoleMatchingMode, Roles, Unprotected } from 'nest-keycloak-connect';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  // @Unprotected()
  @Roles({ roles: ['user','admin'] })
  create(@Body() createTransactionDto: CreateTransactionDto) {
    console.log('body: ',createTransactionDto);
    return this.transactionsService.create(createTransactionDto);
  }

  @Get()
  // @Unprotected()
  @Roles({ roles: ['user','admin'] })
  findAll() { 
    return this.transactionsService.findAll();
  }

  @Get('id/:id')
  @Roles({ roles: ['user','admin'] })
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOneById(id);
  }

  @Get('name/:name')
  @Roles({ roles: ['user','admin'] })
  findOneByFilter(@Param('name') name: number) {
    return this.transactionsService.findOneByName({name});
  }

  @Patch('id/:id')
  @Roles({ roles: ['user','admin'] })
  updateById(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionsService.findAndUpdateById(id, updateTransactionDto);
  }

  @Patch('name/:name')
  @Roles({ roles: ['user','admin'] })
  updateByName(@Param('name') name: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionsService.findAndUpdateByName({'name': name}, updateTransactionDto);
  }

  @Delete(':id')
  @Roles({ roles: ['user','admin'] })
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(id);
  }
}
