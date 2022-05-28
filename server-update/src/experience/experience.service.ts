import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExperienceEntity } from './models/experience.entity';
import { from, Observable, map, tap, switchMap } from 'rxjs';
import { UserService } from 'src/auth/services/user/user.service';
import { UserEntity } from 'src/auth/models/user.entity';
import { ImageService } from 'src/image/image.service';
import { ImageEntity } from 'src/image/models/image.entity';


@Injectable()
export class ExperienceService {
    
    constructor(
        @InjectRepository(ExperienceEntity)
        private readonly experienceRepository: Repository<ExperienceEntity>,
        private readonly userService: UserService,
        private readonly imageService: ImageService,
    ) {}
    
    
    getAll(): Observable<ExperienceEntity[]> {
        return from(this.experienceRepository.find({ relations: ['user', 'images', 'icons'] }))
            .pipe(
            map((elements: ExperienceEntity[]) => {
                return elements;
            }),
        );
    }

    
    getOne(id: number): Observable<ExperienceEntity> {
        return from(this.experienceRepository.findOneOrFail({where: {id}, relations: ['user', 'images', 'icons']}))
            .pipe(
            map((element: ExperienceEntity) => {
                return element;
            }),
        );
    }
    
    
    editExperience(experience: ExperienceEntity, userId: number): Observable<ExperienceEntity> {

        const { id, name, title, text, icons, images, term, status, website, languageCode } = experience;

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
                tap((element: ExperienceEntity) => {
                    console.log(element)
                    if (!element)
                      throw new HttpException(
                        'An education has not been found.',
                        HttpStatus.NOT_FOUND,
                    )
                    else if (element?.user?.id !== userId)
                      throw new HttpException(
                        'You need to be an author of this experience.',
                        HttpStatus.NOT_ACCEPTABLE,
                    );
                }),
                switchMap((element) => {

                    const formData = new ExperienceEntity();
                    formData.name = name || element.name
                    formData.title = title || element.title
                    formData.text = text || element.text
                    formData.icons = icons || element.icons
                    formData.images = images || element.images
                    formData.term = term || element.term
                    formData.status = status || element.status
                    formData.website = website || element.website
                    formData.languageCode = languageCode || element.languageCode

                    return from(
                        this.experienceRepository.update(id, formData),
                        ).pipe(
                            switchMap(() => {
                            return this.getOne(id).pipe(
                                map((edu: ExperienceEntity) => {
                                    return edu;
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
    
    
    includeImage(formData: any, userId: number, type: "experience_icon" | "experience_image" = "experience_image"): Observable<any> {

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
                            tap((element: ExperienceEntity) => {
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

                            switchMap((element: ExperienceEntity) => {
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
                                            map((experience: ExperienceEntity) => {
                                                return experience;
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

    createExperience(experience: ExperienceEntity, userId: number): Observable<ExperienceEntity> {

        const { name, title, text, icons, images, term, status, website, languageCode } = experience;

        
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
                    this.experienceRepository.save({
                        name, title, text, icons, images, term, status, website, languageCode, user
                    }),
                    ).pipe(
                    map((element: ExperienceEntity) => {
                        return element;
                    }),
                );
            }

        ))

    }



}
