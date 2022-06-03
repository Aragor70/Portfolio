import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectEntity } from './models/project.entity';
import { from, Observable, map, tap, switchMap } from 'rxjs';
import { UserEntity } from 'src/auth/models/user.entity';
import { UserService } from 'src/auth/services/user/user.service';
import { ImageService } from 'src/image/image.service';
import { ImageEntity } from 'src/image/models/image.entity';
import { ProjectRepositoryEntity } from './models/projectRepository.entity';

@Injectable()
export class ProjectService {
    
    constructor(
        @InjectRepository(ProjectEntity)
        private readonly projectRepository: Repository<ProjectEntity>,
        @InjectRepository(ProjectRepositoryEntity)
        private readonly reposRepository: Repository<ProjectRepositoryEntity>,
        private readonly userService: UserService,
        private readonly imageService: ImageService,
    ) {}
    
    
    getAll(): Observable<ProjectEntity[]> {
        return from(this.projectRepository.find({ relations: ['user', 'images', 'icons', 'repository', 'status'] }))
            .pipe(
            map((elements: ProjectEntity[]) => {
                return elements;
            }),
        );
    }
    
    getOne(id: number): Observable<ProjectEntity> {
        return from(this.projectRepository.findOneOrFail({ where: {id}, relations: ['user', 'images', 'icons', 'repository', 'status'] }))
            .pipe(
            map((element: ProjectEntity) => {
                return element;
            }),
        );
    }
    
    includeImage(formData: any, userId: number, type: "project_icon" | "project_image" = "project_image"): Observable<any> {

        return this.userService.findUserById(userId).pipe(
            tap((element: UserEntity) => {
                if (!element)
                  throw new HttpException(
                    'A user has not been found.',
                    HttpStatus.BAD_REQUEST,
                  );
            }),
            switchMap(() => {
                return from(this.imageService.saveImage(formData)).pipe(
                    switchMap((image: ImageEntity) => {
                        return this.getOne(formData.id).pipe(
                            tap((element: ProjectEntity) => {
                                console.log('ciao', element)
                                if (!element)
                                  throw new HttpException(
                                    'An education has not been found.',
                                    HttpStatus.NOT_FOUND,
                                )
                                else if (element?.user?.id !== userId)
                                  throw new HttpException(
                                    'You need to be an author of this project.',
                                    HttpStatus.NOT_ACCEPTABLE,
                                );
                            }),

                            switchMap((element: ProjectEntity) => {
                                return from(
                                    this.imageService.updateOne(image.id, 
                                        {...image, [type]: element}).pipe(
                                            map((img: ImageEntity) => {
                                                return img;
                                            }),
                                        )
                                )
                                .pipe(
                                        switchMap(() => {
                                        return this.getOne(element.id).pipe(
                                            map((project: ProjectEntity) => {
                                                return project;
                                            }),
                                        )}
                                    )
                                );
                            })
                        )
                    })
                )
            })

        )
    }
    
    
    editProject(project: ProjectEntity, userId: number): Observable<ProjectEntity> {

        const { id, name, title, text, icons, images, repositories, status, website, languageCode } = project;

        return this.userService.findUserById(userId).pipe(
            tap((element: UserEntity) => {
                if (!element)
                  throw new HttpException(
                    'A user has not been found.',
                    HttpStatus.BAD_REQUEST,
                  );
            }),
            switchMap(() => {
              return this.getOne(id).pipe(
                tap((element: ProjectEntity) => {
                    if (!element)
                      throw new HttpException(
                        'An education has not been found.',
                        HttpStatus.NOT_FOUND,
                    )
                    else if (element?.user?.id !== userId)
                      throw new HttpException(
                        'You need to be an author of this project.',
                        HttpStatus.NOT_ACCEPTABLE,
                    );
                }),
                switchMap((element: ProjectEntity) => {

                    const formData = new ProjectEntity();
                    formData.name = name || element.name
                    formData.title = title || element.title
                    formData.text = text || element.text
                    formData.icons = icons || element.icons
                    formData.images = images || element.images
                    formData.status = status || element.status
                    formData.website = website || element.website
                    formData.repositories = repositories || element.repositories
                    formData.languageCode = languageCode || element.languageCode

                    return from(
                        this.projectRepository.update(id, formData),
                        ).pipe(
                            switchMap(() => {
                            return this.getOne(id).pipe(
                                map((project: ProjectEntity) => {
                                    return project;
                                }),
                            )}
                        )
                    );
                })
              )
            
            }
            ),

        )
       
    }
    
    createProject(project: ProjectEntity, userId: number): Observable<ProjectEntity> {

        const { name, title, text, status, website, repositories, languageCode } = project;

        
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
                        name, title, text, status, website, repositories, languageCode, user
                    }),
                    ).pipe(
                    map((element: ProjectEntity) => {
                        return element;
                    }),
                );
            }

        ))

    }
    
    includeRepository(formData: any, userId: number, type: 'include' | 'exclude'): Observable<ProjectEntity> {

        const { name, url, id } = formData;
        
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
                        this.getOne(id)).pipe(
                        tap((element: ProjectEntity) => {
                            if (!element) {
                                throw new HttpException(
                                'A user has not been found.',
                                HttpStatus.BAD_REQUEST,
                                );
                            } else if (!(element?.user?.id === user?.id)) {
                                throw new HttpException(
                                    'You need to be an author of this project.',
                                    HttpStatus.NOT_ACCEPTABLE,
                                );
                            }}),

                        switchMap((project: ProjectEntity) => {

                            if (type === 'include') {
                                return from(
                                    this.reposRepository.save({
                                        name, url, project
                                    }),
                                    ).pipe(
                                    map(() => {
                                        return project
                                    }),
                                );
                            } else {
                                throw new HttpException(
                                    'Please specify the type.',
                                    HttpStatus.BAD_REQUEST,
                                );
                            }
                        })
                    );
                })

        )

    }
}
