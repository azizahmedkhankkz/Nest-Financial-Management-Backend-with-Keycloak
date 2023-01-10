import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateFineDto } from './create-fine.dto';
import { Types } from 'mongoose';

export class UpdateFineDto extends PartialType(CreateFineDto) {
    
    
    @ApiProperty({
      description: 'The detail of a fine',
      required: false
    })
      detail: string;
      
    @ApiProperty({
      description: 'The type of a fine',
      required: false
    })
      type: string;

    @ApiProperty({
        description: 'The user of a fine',
        required: false
      })
      user: Types.ObjectId;

    @ApiProperty({
        description: 'The status of a fine',
        required: false
      })
      status: string;

    @ApiProperty({
        description: 'The amount of a fine',
        minimum: 1,
        default: 1,
        required: false
      })
      amount: number;
}
