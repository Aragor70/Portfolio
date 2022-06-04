import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ImageModule } from 'src/image/image.module';
import { ProjectEntity } from './models/project.entity';
import { ProjectLanguageVersionEntity } from './models/projectLanguageVersion.entity';
import { ProjectRepositoryEntity } from './models/projectRepository.entity';
import { ProjectStatusEntity } from './models/projectStatus.entity';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
        ProjectEntity,
        ProjectRepositoryEntity,
        ProjectStatusEntity,
        ProjectLanguageVersionEntity
    ]),
    AuthModule,
    ImageModule,
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [
    ProjectService,
  ]
})
export class ProjectModule {}
