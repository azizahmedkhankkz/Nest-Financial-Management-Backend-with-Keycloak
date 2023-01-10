import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionDto } from './create-transaction.dto';
import { Types } from 'mongoose';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {

  @ApiProperty({
      description: 'The name of a transaction',
      required: false
    })
    detail: string;

  @ApiProperty({
      description: 'The fine of a transaction',
      required: false
    })
    fine: Types.ObjectId;

  @ApiProperty({
      description: 'The amount of a transaction',
      minimum: 1,
      default: 1,
      required: false
    })
    amount: number;
  
  @ApiProperty({
    description: 'The type of a transaction',
    required: false
  })
    type: string;
}
