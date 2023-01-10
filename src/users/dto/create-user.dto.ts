import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

    @ApiProperty({
        description: 'The name of a user',
      })
    name: string;
    
    @ApiProperty({
        description: 'The password of a user',
      })
    password: string;

    @ApiProperty({
        description: 'The designation of a user',
      })
    designation: string;

    @ApiProperty({
        description: 'The age of a user',
        minimum: 1,
      })
    age: number;

    @ApiProperty({
        description: 'The due amount of a user',
        minimum: 0,
        default: 0,
      })
    dueAmount: number;

    @ApiProperty({
        description: 'The paid amount of a user',
        minimum: 0,
        default: 0,
      })
    paidAmount: number;
}