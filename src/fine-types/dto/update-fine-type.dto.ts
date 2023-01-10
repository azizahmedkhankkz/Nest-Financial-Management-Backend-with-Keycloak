import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateFineTypeDto } from './create-fine-type.dto';

export class UpdateFineTypeDto extends PartialType(CreateFineTypeDto) {

  @ApiProperty({
      description: 'The name of a fineType',
    })
      name: string;
  
  @ApiProperty({
    description: 'The amount of a transaction',
    minimum: 1,
    default: 1,
    required: false
  })
    amount: number;
}
