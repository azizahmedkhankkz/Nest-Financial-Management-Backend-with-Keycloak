import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { Resource, Public, Roles, Unprotected } from 'nest-keycloak-connect';

@Controller()
@Resource('tech-fund-be')
export class AppController {
  
  @Post('/login')
  async login(@Request() req) {
    return req.user;
  }
  @Get('/hello')
  // @Unprotected()
  @Roles({ roles: ['user'] })
  // @Public()
  findAll() { 
    return 'hello world';
  }
}
