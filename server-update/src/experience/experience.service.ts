import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExperienceEntity } from './models/experience.entity';
import { from, Observable, map, tap, switchMap } from 'rxjs';
import { UserService } from 'src/auth/services/user/user.service';
import { UserEntity } from 'src/auth/models/user.entity';
import { ImageService } from 'src/image/image.service';
import { ImageEntity } from 'src/image/models/image.entity';
import { searchPattern } from 'src/utils/constant';
import * as moment from 'moment';
import { ExperienceLanguageVersionEntity } from './models/experienceLanguageVersion.entity';


@Injectable()
export class ExperienceService {
    
    constructor(
        @InjectRepository(ExperienceEntity)
        private readonly experienceRepository: Repository<ExperienceEntity>,
        @InjectRepository(ExperienceLanguageVersionEntity)
        private readonly languageRepository: Repository<ExperienceLanguageVersionEntity>,
        private readonly userService: UserService,
        private readonly imageService: ImageService,
    ) {}
    
    
    getAll(payload: any): Observable<ExperienceEntity[]> {

        
        const { phrase = null, startDate = null, endDate = null, isVisible = null } = payload;
        
        if (phrase && (typeof phrase !== 'string' || !phrase.match(searchPattern))) {
            throw new HttpException(
                'Search with letters, numbers, spaces, commas (,) dots (.) dashes (-), or underlines (_).',
                HttpStatus.BAD_REQUEST)
        }

        const request = this.experienceRepository.createQueryBuilder('experience')
        .leftJoinAndSelect('experience.user', 'user')
        .leftJoinAndSelect('experience.images', 'images')
        .leftJoinAndSelect('experience.icons', 'icons')
        .leftJoinAndSelect('experience.languageVersions', 'languageVersions')
        .orderBy('experience.status', 'ASC')
        .orderBy('experience.order', 'ASC')

        if ((isVisible === 'true') || (isVisible === 'false')) {
            request.where("experience.isVisible", { isVisible })
        }

        if (phrase) {
            request.andWhere("experience.name ILIKE :name", { name: `%${phrase}%` })
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
            map((elements: ExperienceEntity[]) => {
                return elements;
            }),
        );
    }

    
    getOne(id: number): Observable<ExperienceEntity> {
        return from(this.experienceRepository.findOneOrFail({where: {id}, relations: ['user', 'images', 'icons', 'languageVersions']}))
            .pipe(
            map((element: ExperienceEntity) => {
                return element;
            }),
        );
    }
    
    updateOrCreateLanguageVersion(experience: ExperienceEntity, formData: ExperienceLanguageVersionEntity): Observable<ExperienceEntity> {
        return from(this.languageRepository.findOne({ where: { experience: { id: experience.id }, languageCode: formData.languageCode }, relations: ['experience'] }))
            .pipe(
            switchMap((element: ExperienceLanguageVersionEntity) => {

                if (element?.id) {

                    const version = new ExperienceLanguageVersionEntity();
                    version.text = formData?.text || element.text
                    version.title = formData?.title || element.title
                    version.languageCode = element.languageCode
                    version.experience = experience;

                    return from(this.languageRepository.update(element.id, version)).pipe(
                        switchMap(() => {
                            return this.getOne(experience.id)
                        })
                    )
                } else {
                    if (!formData.languageCode) return this.getOne(experience.id);
                    return from(this.languageRepository.save({...formData, experience})).pipe(
                        switchMap(() => {
                            return this.getOne(experience.id)
                        })
                    )
                }
            }),
        );
    }
    
    
    editExperience(experience: any, userId: number): Observable<ExperienceEntity> {

        const { id, name, title, text, term, status, order, website, languageCode, isVisible } = experience;

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
                switchMap((element: ExperienceEntity) => {

                    const formData = new ExperienceEntity();
                    formData.name = name || element.name
                    formData.term = term || element.term
                    formData.status = status || element.status
                    formData.order = order || element.order
                    formData.website = website || element.website
                    formData.isVisible = ((isVisible === true) || (isVisible === false)) ? isVisible : element.isVisible


                    const languageVersion = new ExperienceLanguageVersionEntity();
                    languageVersion.languageCode = languageCode
                    languageVersion.text = text
                    languageVersion.title = title

                    return from(
                        this.experienceRepository.update(id, formData),
                        ).pipe(
                            switchMap(() => {
                                return this.getOne(id).pipe(
                                    switchMap((exp: ExperienceEntity) => {
                                        return this.updateOrCreateLanguageVersion(exp, languageVersion)
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
                                    )})
                                );
                            })
                        )
                    })
                )
            })

        )
    }

    createExperience(experience: any, userId: number): Observable<ExperienceEntity> {

        const { name, title, text, icons, images, term, status, order, website, languageCode, isVisible } = experience;

        
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
                        name, icons, images, term, status, order, website, languageCode, user, isVisible
                    }),
                    ).pipe(
                        switchMap((element: ExperienceEntity) => {
                            return from(this.languageRepository.save({ title, text, languageCode, experience: element })).pipe(
                                switchMap(() => {
                                    return this.getOne(element.id)
                                })
                            )
                        }),
                );
            }

        ))

    }



}
