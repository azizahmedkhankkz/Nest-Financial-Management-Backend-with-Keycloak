import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type FineTypeDocument = FineType & Document;

@Schema({ timestamps: true })
export class FineType {
    @Prop({
        required: true
    })
        name: string;
    
    @Prop({
        min: 1
    })
        amount: number;

}

export const FineTypeSchema = SchemaFactory.createForClass(FineType);