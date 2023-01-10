import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { FineType, FineTypeDocument } from './schemas/fine-types.schema';
import { CreateFineTypeDto } from './dto/create-fine-type.dto';
import { UpdateFineTypeDto } from './dto/update-fine-type.dto';

// This should be a real class/interface representing a fineType entity
// export type FineType = any;

@Injectable()
export class FineTypesService {
  constructor(@InjectModel(FineType.name) private fineTypeModel: Model<FineTypeDocument>) {}



  // private readonly fineTypes = [
  //   {
  //     fineTypeId: 1,
  //     fineTypename: 'john',
  //     password: 'changeme',
  //   },
  //   {
  //     fineTypeId: 2,
  //     fineTypename: 'maria',
  //     password: 'guess',
  //   },
  // ];

  // async findOne(fineTypename: string): Promise<FineType | undefineTyped> {
  //   return this.fineTypes.find(fineType => fineType.fineTypename === fineTypename);
  // }


  async create(createFineTypeDto: CreateFineTypeDto): Promise<FineType> {
    const createdFineType = new this.fineTypeModel(createFineTypeDto);
    return await createdFineType.save();
  }
  
  async findAll(): Promise<FineType[]> {
    return this.fineTypeModel.find().exec();
  }

  async findOneByName(filter: any): Promise<FineType[]> {
    return this.fineTypeModel.find(filter).exec();
  }

  async findOneById(id: string) {
    return await this.fineTypeModel.findById(id);
  }

  async findAndUpdateById(id: string, updateFineTypeDto: UpdateFineTypeDto) {
    return await this.fineTypeModel.findByIdAndUpdate(id, updateFineTypeDto);
  }

  async findAndUpdateByName(filter: any, updateFineTypeDto: UpdateFineTypeDto) {
    return await this.fineTypeModel.findOneAndUpdate(filter, updateFineTypeDto);
  }

  async remove(id: string) {
    return await this.fineTypeModel.findByIdAndDelete(id);
  }
}