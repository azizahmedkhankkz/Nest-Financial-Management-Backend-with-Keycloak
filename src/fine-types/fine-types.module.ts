import { Module } from '@nestjs/common';
import { FineTypesService } from './fine-types.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FineTypesController } from './fine-types.controller';
import { FineType, FineTypeSchema } from './schemas/fine-types.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: FineType.name, schema: FineTypeSchema }])],
  controllers: [FineTypesController],
  providers: [FineTypesService],
  exports: [FineTypesService],
})
export class FineTypesModule {}