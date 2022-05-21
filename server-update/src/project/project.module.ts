import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from './models/project.entity';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
        ProjectEntity
    ])
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [
    ProjectService,
  ]
})
export class ProjectModule {}
