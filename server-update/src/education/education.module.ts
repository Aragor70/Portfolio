import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { EducationController } from './education.controller';
import { EducationService } from './education.service';
import { EducationEntity } from './models/education.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
        EducationEntity
    ]),
    AuthModule
  ],
  controllers: [EducationController],
  providers: [EducationService],
  exports: [
    EducationService,
  ]
})
export class EducationModule {}
