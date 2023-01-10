import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema({ timestamps: true })
export class Transaction {
    @Prop({
        required: true
    })
        detail: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Fine'})
        fine:  Types.ObjectId 

    @Prop({
        min: 1
    })
        amount: number;
    
    @Prop({
        required: true
    })
        type: string;

}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);