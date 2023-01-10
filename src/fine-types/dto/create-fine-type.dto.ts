import { ApiProperty } from '@nestjs/swagger';

export class CreateFineTypeDto {

    @ApiProperty({
        description: 'The name of a fineType',
      })
        name: string;
    
    @ApiProperty({
      description: 'The amount of a transaction',
      minimum: 1,
      default: 1,
    })
      amount: number;
}