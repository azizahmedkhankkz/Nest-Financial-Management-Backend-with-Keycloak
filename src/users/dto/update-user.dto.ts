import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    
    @ApiProperty({
        description: 'The name of a user',
        required: false
      })
    name: string;
    
    @ApiProperty({
        description: 'The password of a user',
        required: false
      })
    password: string;

    @ApiProperty({
        description: 'The designation of a user',
        required: false
      })
    designation: string;

    @ApiProperty({
        description: 'The age of a user',
        minimum: 1,
        required: false
      })
    age: number;

    @ApiProperty({
        description: 'The due amount of a user',
        minimum: 0,
        default: 0,
        required: false
      })
    dueAmount: number;

    @ApiProperty({
        description: 'The paid amount of a user',
        minimum: 0,
        default: 0,
        required: false
      })
    paidAmount: number;
}
