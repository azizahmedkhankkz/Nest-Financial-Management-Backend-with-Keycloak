import { Module } from '@nestjs/common';
import { FinesService } from './fines.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FinesController } from './fines.controller';
import { Fine, FineSchema } from './schemas/fines.schema';
import { User, UserSchema } from '../users/schemas/users.schema';
import { Transaction, TransactionSchema } from '../transactions/schemas/transactions.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Fine.name, schema: FineSchema }]),
            MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
            MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }])],
  controllers: [FinesController],
  providers: [FinesService],
  exports: [FinesService],
})
export class FinesModule {}