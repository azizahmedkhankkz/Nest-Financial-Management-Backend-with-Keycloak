import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction, TransactionDocument } from './schemas/transactions.schema';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

// This should be a real class/interface representing a transaction entity
// export type Transaction = any;

@Injectable()
export class TransactionsService {
  constructor(@InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>) {}



  // private readonly transactions = [
  //   {
  //     transactionId: 1,
  //     transactionname: 'john',
  //     password: 'changeme',
  //   },
  //   {
  //     transactionId: 2,
  //     transactionname: 'maria',
  //     password: 'guess',
  //   },
  // ];

  // async findOne(transactionname: string): Promise<Transaction | undetransactiond> {
  //   return this.transactions.find(transaction => transaction.transactionname === transactionname);
  // }


  async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    console.log('createTransactionDto: ',createTransactionDto);
    const createdTransaction = new this.transactionModel(createTransactionDto);
    console.log('createdTransaction: ',createdTransaction);
    return await createdTransaction.save();
  }
  
  async findAll(): Promise<Transaction[]> {
    return this.transactionModel.find().populate({
      path: 'fine',
      model: 'Fine',
      populate: {
        path: 'user',
        model: 'User'
      }
    });
  }

  async findOneByName(filter: any): Promise<Transaction[]> {
    return this.transactionModel.find(filter).populate('fine');
  }

  async findOneById(id: string) {
    return await this.transactionModel.findById(id);
  }

  async findAndUpdateById(id: string, updateTransactionDto: UpdateTransactionDto) {
    return await this.transactionModel.findByIdAndUpdate(id, updateTransactionDto);
  }

  async findAndUpdateByName(filter: any, updateTransactionDto: UpdateTransactionDto) {
    return await this.transactionModel.findOneAndUpdate(filter, updateTransactionDto);
  }

  async remove(id: string) {
    return await this.transactionModel.findByIdAndDelete(id);
  }
}