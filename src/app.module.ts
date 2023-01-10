import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';
import { FinesModule } from './fines/fines.module';
import { FineTypesModule } from './fine-types/fine-types.module';
import {
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
  AuthGuard,
} from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:admin123@lahorerestaurant.qcjqg.mongodb.net/tech_fund_portal?retryWrites=true&w=majority'),
    KeycloakConnectModule.register({
      authServerUrl: 'http://localhost:8080',
      realm: 'tech-fund-realm',
      clientId: 'tech-fund-be',
      bearerOnly: true,
      // logLevels: ['verbose'],
      // optional useNestLogger, uses the logger from app.useLogger() implementation
      // useNestLogger: false,
      secret: 'PtYF108xwHRWRNGdhkjZgGwlpYc13wEh',
      // Secret key of the client taken from keycloak server
    }),
    AuthModule,
    UsersModule,
    TransactionsModule,
    FinesModule,
    FineTypesModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // This adds a global level authentication guard,
    // you can also have it scoped
    // if you like.
    //
    // Will return a 401 unauthorized when it is unable to
    // verify the JWT token or Bearer header is missing.
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    // This adds a global level resource guard, which is permissive.
    // Only controllers annotated with @Resource and 
    // methods with @Scopes
    // are handled by this guard.
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    // New in 1.1.0
    // This adds a global level role guard, which is permissive.
    // Used by `@Roles` decorator with the 
    // optional `@AllowAnyRole` decorator for allowing any
    // specified role passed.
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
