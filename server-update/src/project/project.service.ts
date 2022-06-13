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
import { ProjectStatusEntity } from './models/projectStatus.entity';
import { ProjectLanguageVersionEntity } from './models/projectLanguageVersion.entity';
import * as moment from 'moment';
import {searchPattern} from 'src/utils/constant';

@Injectable()
export class ProjectService {
    
    constructor(
        @InjectRepository(ProjectEntity)
        private readonly projectRepository: Repository<ProjectEntity>,
        @InjectRepository(ProjectRepositoryEntity)
        private readonly reposRepository: Repository<ProjectRepositoryEntity>,
        @InjectRepository(ProjectStatusEntity)
        private readonly statusRepository: Repository<ProjectStatusEntity>,
        @InjectRepository(ProjectLanguageVersionEntity)
        private readonly languageRepository: Repository<ProjectLanguageVersionEntity>,

        private readonly userService: UserService,
        private readonly imageService: ImageService,

    ) {}
    
    getAll(payload: any): Observable<ProjectEntity[]> {

        const { phrase = null, startDate = null, endDate = null, isVisible = null } = payload;
        
        if (phrase && (typeof phrase !== 'string' || !phrase.match(searchPattern))) {
            throw new HttpException(
                'Search with letters, numbers, spaces, commas (,) dots (.) dashes (-), or underlines (_).',
                HttpStatus.BAD_REQUEST)
        }

        const request = this.projectRepository.createQueryBuilder('project')
        .leftJoinAndSelect('project.user', 'user')
        .leftJoinAndSelect('project.images', 'images')
        .leftJoinAndSelect('project.icons', 'icons')
        .leftJoinAndSelect('project.repositories', 'repositories')
        .leftJoinAndSelect('project.status', 'status')
        .leftJoinAndSelect('project.languageVersions', 'languageVersions')
        .orderBy('status.status', 'ASC')
        .orderBy('status.order', 'ASC')

        if ((isVisible === 'true') || (isVisible === 'false')) {
            request.where("project.isVisible", { isVisible })
        }

        if (phrase) {
            request.andWhere("project.name ILIKE :name", { name: `%${phrase}%` })
        }

        if (startDate) {
            
            request.andWhere('started_at >= :after')
            .setParameter("after", moment(startDate).startOf('day').format())
        }
        if (endDate) {

            request
            .andWhere('started_at <= :before')
            .setParameter("before", moment(endDate).endOf('day').format())
        }


        return from(

            request.getMany()
            )
            .pipe(
            map((elements: ProjectEntity[]) => {
                return elements;
            }),
        );
    }
    
    getOne(id: number): Observable<ProjectEntity> {
        return from(this.projectRepository.findOneOrFail({ where: {id}, relations: ['user', 'images', 'icons', 'repositories', 'status', 'languageVersions'] }))
            .pipe(
            map((element: ProjectEntity) => {
                return element;
            }),
        );
    }
    
    updateOrCreateLanguageVersion(project: ProjectEntity, formData: ProjectLanguageVersionEntity): Observable<ProjectEntity> {
        return from(this.languageRepository.findOne({ where: { project: { id: project.id }, languageCode: formData.languageCode }, relations: ['project'] }))
            .pipe(
            switchMap((element: ProjectLanguageVersionEntity) => {

                if (element?.id) {

                    const version = new ProjectLanguageVersionEntity();
                    version.text = formData?.text || element.text
                    version.title = formData?.title || element.title
                    version.languageCode = element.languageCode
                    version.project = project;

                    return from(this.languageRepository.update(element.id, version)).pipe(
                        switchMap(() => {
                            return this.getOne(project.id)
                        })
                    )
                } else {
                    if (!formData.languageCode) return this.getOne(project.id);
                    return from(this.languageRepository.save({...formData, project})).pipe(
                        switchMap(() => {
                            return this.getOne(project.id)
                        })
                    )
                }
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
    
    
    editProject(project: any, userId: number): Observable<ProjectEntity> {

        const { id, name, title, text, status, website, languageCode, isVisible, started_at } = project;

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
                    formData.status = status || element.status
                    formData.website = website || element.website
                    formData.isVisible = ((isVisible === true) || (isVisible === false)) ? isVisible : element.isVisible
                    formData.started_at = started_at || element.started_at

                    const languageVersion = new ProjectLanguageVersionEntity();
                    languageVersion.languageCode = languageCode
                    languageVersion.text = text
                    languageVersion.title = title


                    return from(
                        this.projectRepository.update(id, formData),
                        ).pipe(
                            switchMap(() => {
                            return this.getOne(id).pipe(
                                switchMap((project: ProjectEntity) => {
                                    return this.updateOrCreateLanguageVersion(project, languageVersion)
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
    
    createProject(project: any, userId: number): Observable<ProjectEntity> {

        const { name, title, text, status, website, repositories, languageCode, isVisible, started_at } = project;

        
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
                        name, status, website, repositories, user, isVisible, started_at
                    }),
                    ).pipe(
                        switchMap((element: ProjectEntity) => {
                            return from(this.languageRepository.save({ title, text, languageCode, project: element })).pipe(
                                switchMap(() => {
                                    return this.getOne(element.id)
                                })
                            )
                        }),
                );
            }

        ))

    }
    
    includeRepository(formData: any, userId: number, type: 'include' | 'exclude'): Observable<ProjectEntity> {

        const { name, url, id, repos_id } = formData;
        
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
                                    switchMap(() => {
                                        return this.getOne(project.id)
                                    }),
                                );
                            } else {
                                return from(
                                    this.reposRepository.delete({ id: repos_id }),
                                    ).pipe(
                                    switchMap(() => {
                                        return this.getOne(project.id)
                                    }),
                                );
                            }
                        })
                    );
                })

        )

    }
    
    includeStatus(formData: any, userId: number, type: 'include' | 'exclude'): Observable<ProjectEntity> {

        const { status, order, id } = formData;
        
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
                                    this.statusRepository.save({
                                        status, order
                                    }),
                                    ).pipe(
                                        switchMap((status: ProjectStatusEntity) => {

                                            return this.editProject({...project, status}, userId)
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
