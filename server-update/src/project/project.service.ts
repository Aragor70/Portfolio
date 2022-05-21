import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectEntity } from './models/project.entity';
import { from, Observable, of, pipe, map } from 'rxjs';

@Injectable()
export class ProjectService {
    
    constructor(
        @InjectRepository(ProjectEntity)
        private readonly projectRepository: Repository<ProjectEntity>,
    ) {}
    
    
    getAll(): Observable<ProjectEntity[]> {
        return from(this.projectRepository.find())
            .pipe(
            map((elements: ProjectEntity[]) => {
                return elements;
            }),
        );
    }
    
    createProject(project: ProjectEntity): Observable<ProjectEntity> {

        const { name, title, text, icons, images, status, website, repository, languageCode } = project;

        return from(
            this.projectRepository.save({
                name, title, text, icons, images, status, website, repository, languageCode
            }),
            ).pipe(
            map((element: ProjectEntity) => {
                return element;
            }),
        );
    }
}
