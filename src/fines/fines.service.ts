import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Fine, FineDocument } from './schemas/fines.schema';
import { User, UserDocument } from '../users/schemas/users.schema';
import { Transaction, TransactionDocument } from '../transactions/schemas/transactions.schema';
import { CreateFineDto } from './dto/create-fine.dto';
import { UpdateFineDto } from './dto/update-fine.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { CreateTransactionDto } from '../transactions/dto/create-transaction.dto';
import {InjectConnection} from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

// This should be a real class/interface representing a fine entity
// export type Fine = any;

@Injectable()
export class FinesService {
  constructor(
    @InjectModel(Fine.name) private fineModel: Model<FineDocument>,
    @InjectConnection() private readonly connection: mongoose.Connection,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>) {}



  // private readonly fines = [
  //   {
  //     fineId: 1,
  //     finename: 'john',
  //     password: 'changeme',
  //   },
  //   {
  //     fineId: 2,
  //     finename: 'maria',
  //     password: 'guess',
  //   },
  // ];

  // async findOne(finename: string): Promise<Fine | undefined> {
  //   return this.fines.find(fine => fine.finename === finename);
  // }

  async payFine(id: string) {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const updateFineDto: UpdateFineDto = {
        status: 'paid'
      } as UpdateFineDto;
      
      //update fine
      const fine = await this
        .fineModel.findByIdAndUpdate(id, updateFineDto)
        .populate('user')
        .session(session);
   
      if (!fine) {
        throw new NotFoundException('fine not found');
      }

      let user: any = fine.user;

      const updateUserDto: UpdateUserDto = {
        paidAmount: user.paidAmount+fine.amount,
        dueAmount: user.dueAmount-fine.amount
      } as UpdateUserDto;
      
      //update user
      const updatedUser = await this
        .userModel.findByIdAndUpdate(user._id, updateUserDto)
        .session(session);

      if (!updatedUser) {
        throw new NotFoundException('user not found');
      }
      const createTransactionDto: CreateTransactionDto = {
        detail: fine.detail,
        fine: fine._id,
        amount: fine.amount,
        type: 'credit'
      };
      
      //create transaction
      const createdTransaction = new this.transactionModel(createTransactionDto);
      await createdTransaction.save({session});
      
      if (!createdTransaction) {
        throw new NotFoundException('transaction not created');
      }

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }

  }

  async create(createFineDto: CreateFineDto): Promise<Fine> {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {

      //create fine
      const createdFine = new this.fineModel(createFineDto);
      await createdFine.save();

      if (!createdFine) {
        throw new NotFoundException('fine not created');
      }

      let fine = await this.fineModel.findById(createdFine._id).populate('user')
      let user: any = fine.user;

      const updateUserDto: UpdateUserDto = {
        dueAmount: user.dueAmount+fine.amount
      } as UpdateUserDto;
      
      //update user
      const updatedUser = await this
        .userModel.findByIdAndUpdate(user._id, updateUserDto)
        .session(session);
        await session.commitTransaction();

      if (!updatedUser) {
        throw new NotFoundException('user not found');
      }
      return createdFine;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  
  async getCount(): Promise<Number> {
    return this.fineModel.count();
  }
  
  async getPaidFines(): Promise<Fine[]> {
    return await this.fineModel.find({status: 'paid'})
    .populate('user');
  }

  async findAll(): Promise<Fine[]> {
    return await this.fineModel.find().populate('user');
  }

  async findOneByName(filter: any): Promise<Fine[]> {
    return await this.fineModel.find(filter).populate('user');
  }

  async findOneById(id: string) {
    return await this.fineModel.findById(id);
  }

  async findAndUpdateById(id: string, updateFineDto: UpdateFineDto) {
    console.log('updateFineDto: ',updateFineDto)
    return await this.fineModel.findByIdAndUpdate(id, updateFineDto);
  }

  async findAndUpdateByName(filter: any, updateFineDto: UpdateFineDto) {
    return await this.fineModel.findOneAndUpdate(filter, updateFineDto);
  }

  async remove(id: string) {
    return await this.fineModel.findByIdAndDelete(id);
  }
}