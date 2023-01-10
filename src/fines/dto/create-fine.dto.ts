import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateFineDto {

    @ApiProperty({
        description: 'The detail of a fine',
      })
      detail: string;
    
    @ApiProperty({
      description: 'The type of a fine',
    })
      type: string;

    @ApiProperty({
        description: 'The user of a fine',
      })
      user: Types.ObjectId;

    @ApiProperty({
        description: 'The status of a fine'
      })
      status: string;

    @ApiProperty({
        description: 'The amount of a fine',
        minimum: 1,
        default: 1,
      })
      amount: number;
}