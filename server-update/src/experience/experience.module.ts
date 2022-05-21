import { Module } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { ExperienceController } from './experience.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExperienceEntity } from './models/experience.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
        ExperienceEntity
    ])
  ],
  providers: [ExperienceService],
  controllers: [ExperienceController],
  exports: [
    ExperienceService,
  ]
})
export class ExperienceModule {}
