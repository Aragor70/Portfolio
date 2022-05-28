import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { ImageEntity } from './models/image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
        ImageEntity
    ]),
  ],
  controllers: [ImageController],
  providers: [ImageService],
  exports: [
    ImageService,
  ]
})
export class ImageModule {}
