import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ImageModule } from 'src/image/image.module';
import { ProjectEntity } from './models/project.entity';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
        ProjectEntity,
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
