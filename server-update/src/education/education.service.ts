import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EducationEntity } from './models/education.entity';
import { from, Observable, map, tap, switchMap } from 'rxjs';
import { UserEntity } from 'src/auth/models/user.entity';
import { UserService } from 'src/auth/services/user/user.service';
import { ImageEntity } from 'src/image/models/image.entity';
import { ImageService } from 'src/image/image.service';
import { searchPattern } from 'src/utils/constant';
import moment from 'moment';
import { EducationLanguageVersionEntity } from './models/educationLanguageVersion.entity';

@Injectable()
export class EducationService {

    
    constructor(
        @InjectRepository(EducationEntity)
        private readonly educationRepository: Repository<EducationEntity>,
        @InjectRepository(EducationLanguageVersionEntity)
        private readonly languageRepository: Repository<EducationLanguageVersionEntity>,
        private readonly userService: UserService,
        private readonly imageService: ImageService,
    ) {}
    
    
    getAll(payload: any): Observable<EducationEntity[]> {

        
        const { phrase = null, startDate = null, endDate = null, isVisible = null } = payload;
        
        if (phrase && (typeof phrase !== 'string' || !phrase.match(searchPattern))) {
            throw new HttpException(
                'Search with letters, numbers, spaces, commas (,) dots (.) dashes (-), or underlines (_).',
                HttpStatus.BAD_REQUEST)
        }

        const request = this.educationRepository.createQueryBuilder('education')
        .leftJoinAndSelect('education.user', 'user')
        .leftJoinAndSelect('education.images', 'images')
        .leftJoinAndSelect('education.icons', 'icons')
        .leftJoinAndSelect('education.languageVersions', 'languageVersions')
        .orderBy('education.status', 'ASC')
        .orderBy('education.order', 'ASC')

        if ((isVisible === 'true') || (isVisible === 'false')) {
            request.where("education.isVisible", { isVisible })
        }

        if (phrase) {
            request.andWhere("education.name ILIKE :name", { name: `%${phrase}%` })
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
            map((element: EducationEntity[]) => {
                console.log(element)
                return element;
            }),
        );
    }
    
    getOne(id: number): Observable<EducationEntity> {
        return from(this.educationRepository.findOneOrFail({where: {id}, relations: ['user', 'images', 'icons', 'languageVersions']}))
            .pipe(
            map((element: EducationEntity) => {
                return element;
            }),
        );
    }
    updateOrCreateLanguageVersion(education: EducationEntity, formData: EducationLanguageVersionEntity): Observable<EducationEntity> {
        return from(this.languageRepository.findOne({ where: { project: { id: education.id }, languageCode: formData.languageCode }, relations: ['education'] }))
            .pipe(
            switchMap((element: EducationLanguageVersionEntity) => {

                if (element?.id) {

                    const version = new EducationLanguageVersionEntity();
                    version.text = formData?.text || element.text
                    version.title = formData?.title || element.title
                    version.languageCode = element.languageCode
                    version.education = education;

                    return from(this.languageRepository.update(element.id, version)).pipe(
                        switchMap(() => {
                            return this.getOne(education.id)
                        })
                    )
                } else {
                    if (!formData.languageCode) return this.getOne(education.id);
                    return from(this.languageRepository.save({...formData, education})).pipe(
                        switchMap(() => {
                            return this.getOne(education.id)
                        })
                    )
                }
            }),
        );
    }
    
    editEducation(education: any, userId: number): Observable<EducationEntity> {

        const { id, name, title, text, term, status, order, website, languageCode, started_at, isVisible } = education;

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
                tap((element: EducationEntity) => {
                    console.log(element)
                    if (!element)
                      throw new HttpException(
                        'An education has not been found.',
                        HttpStatus.NOT_FOUND,
                    )
                    else if (element?.user?.id !== userId)
                      throw new HttpException(
                        'You need to be an author of this education.',
                        HttpStatus.NOT_ACCEPTABLE,
                    );
                }),
                switchMap((element: EducationEntity) => {
                    
                    const formData = new EducationEntity();
                    formData.name = name || element.name
                    formData.term = term || element.term
                    formData.status = status || element.status
                    formData.order = order || element.order
                    formData.website = website || element.website
                    formData.started_at = started_at || element.started_at
                    formData.isVisible = ((isVisible === true) || (isVisible === false)) ? isVisible : element.isVisible

                    const languageVersion = new EducationLanguageVersionEntity();
                    languageVersion.languageCode = languageCode
                    languageVersion.text = text
                    languageVersion.title = title

                    return from(
                        this.educationRepository.update(id, formData),
                        ).pipe(
                            switchMap(() => {
                            return this.getOne(id).pipe(
                                switchMap((edu: EducationEntity) => {
                                    return this.updateOrCreateLanguageVersion(edu, languageVersion)
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
    
    includeImage(formData: any, userId: number, type: "education_icon" | "education_image" = "education_image"): Observable<any> {

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
                            tap((element: EducationEntity) => {
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

                            switchMap((element: EducationEntity) => {
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
                                            map((education: EducationEntity) => {
                                                return education;
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
    
    createEducation(education: any, userId: number): Observable<EducationEntity> {

        const { name, title, text, icons, images, term, status, order, website, languageCode, isVisible } = education;

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

                    this.educationRepository.save({
                        name, icons, images, term, status, order, website, user, isVisible
                    }),
                    ).pipe(
                        switchMap((element: EducationEntity) => {
                            return from(this.languageRepository.save({ title, text, languageCode, education: element })).pipe(
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
