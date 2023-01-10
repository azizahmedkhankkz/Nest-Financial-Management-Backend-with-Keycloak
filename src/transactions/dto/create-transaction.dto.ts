import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateTransactionDto {

    @ApiProperty({
        description: 'The name of a transaction',
      })
      detail: string;

    @ApiProperty({
        description: 'The fine of a transaction',
      })
      fine: Types.ObjectId;

    @ApiProperty({
        description: 'The amount of a transaction',
        minimum: 1,
        default: 1,
      })
      amount: number;
    
    @ApiProperty({
      description: 'The type of a transaction',
    })
      type: string;
}