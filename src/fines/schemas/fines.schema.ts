import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type FineDocument = Fine & Document;

@Schema({ timestamps: true })
export class Fine {
    @Prop({
        required: false
    })
        detail: string;

    @Prop({
        required: false
    })
        type: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: false })
        user:  Types.ObjectId 

    @Prop({
        required: false
    })
        status: string;

    @Prop({
        min: 1,
        required: false
    })
        amount: number;

}

export const FineSchema = SchemaFactory.createForClass(Fine);