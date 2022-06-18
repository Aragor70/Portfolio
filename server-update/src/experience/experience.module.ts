import { Module } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { ExperienceController } from './experience.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExperienceEntity } from './models/experience.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ImageModule } from 'src/image/image.module';
import { ExperienceLanguageVersionEntity } from './models/experienceLanguageVersion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
        ExperienceEntity,
        ExperienceLanguageVersionEntity
    ]),
    AuthModule,
    ImageModule
  ],
  providers: [ExperienceService],
  controllers: [ExperienceController],
  exports: [
    ExperienceService,
  ]
})
export class ExperienceModule {}
