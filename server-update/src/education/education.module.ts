import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ImageModule } from 'src/image/image.module';
import { EducationController } from './education.controller';
import { EducationService } from './education.service';
import { EducationEntity } from './models/education.entity';
import { EducationLanguageVersionEntity } from './models/EducationLanguageVersion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
        EducationEntity,
        EducationLanguageVersionEntity
    ]),
    AuthModule,
    ImageModule
  ],
  controllers: [EducationController],
  providers: [EducationService],
  exports: [
    EducationService,
  ]
})
export class EducationModule {}
