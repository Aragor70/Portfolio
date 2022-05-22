import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectEntity } from './models/project.entity';
import { from, Observable, map, tap, switchMap } from 'rxjs';
import { UserEntity } from 'src/auth/models/user.entity';
import { UserService } from 'src/auth/services/user/user.service';

@Injectable()
export class ProjectService {
    
    constructor(
        @InjectRepository(ProjectEntity)
        private readonly projectRepository: Repository<ProjectEntity>,
        private readonly userService: UserService,
    ) {}
    
    
    getAll(): Observable<ProjectEntity[]> {
        return from(this.projectRepository.find())
            .pipe(
            map((elements: ProjectEntity[]) => {
                return elements;
            }),
        );
    }
    
    createProject(project: ProjectEntity, userId: number): Observable<ProjectEntity> {

        const { name, title, text, icons, images, status, website, repository, languageCode } = project;

        
        return this.userService.findUserById(userId).pipe(
            tap((element: UserEntity) => {
                if (!element)
                  throw new HttpException(
                    'A user has not been found.',
                    HttpStatus.BAD_REQUEST,
                  );
              }),
            switchMap((user: UserEntity) => {
                return from(
                    this.projectRepository.save({
                        name, title, text, icons, images, status, website, repository, languageCode, user
                    }),
                    ).pipe(
                    map((element: ProjectEntity) => {
                        return element;
                    }),
                );
            }

        ))

    }
}
