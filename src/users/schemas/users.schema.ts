import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @Prop({
        required: true
    })
    name: string;
    
    @Prop({
    })
    password: string;

    @Prop({
        required: true
    })
    designation: string;

    @Prop({
        min: 1
    })
    age: number;

    @Prop({
        default: 0,
        min: 0
    })
    dueAmount: number;

    @Prop({
        default: 0,
        min: 0
    })
    paidAmount: number;

}

export const UserSchema = SchemaFactory.createForClass(User);