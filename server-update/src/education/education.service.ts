import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EducationEntity } from './models/education.entity';
import { from, Observable, map, tap, switchMap } from 'rxjs';
import { UserEntity } from 'src/auth/models/user.entity';
import { UserService } from 'src/auth/services/user/user.service';

@Injectable()
export class EducationService {

    
    constructor(
        @InjectRepository(EducationEntity)
        private readonly educationRepository: Repository<EducationEntity>,
        private readonly userService: UserService,
    ) {}
    
    
    getAll(): Observable<EducationEntity[]> {
        return from(this.educationRepository.find({ relations: ['user'] }))
            .pipe(
            map((element: EducationEntity[]) => {
                return element;
            }),
        );
    }
    
    getOne(id: number): Observable<EducationEntity> {
        return from(this.educationRepository.findOneOrFail({where: {id}, relations: ['user']}))
            .pipe(
            map((element: EducationEntity) => {
                return element;
            }),
        );
    }
    
    editEducation(education: EducationEntity, userId: number): Observable<EducationEntity> {

        const { id, name, title, text, icons, images, term, status, website, languageCode } = education;

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
                switchMap(() => {
                    
                    const formData = new EducationEntity();
                    formData.name = name
                    formData.title = title
                    formData.text = text
                    formData.icons = icons
                    formData.images = images
                    formData.term = term
                    formData.status = status
                    formData.website = website
                    formData.languageCode = languageCode

                    return from(
                        this.educationRepository.update(id, formData),
                        ).pipe(
                            switchMap(() => {
                            return this.getOne(id).pipe(
                                map((edu: EducationEntity) => {
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
    
    createEducation(education: EducationEntity, userId: number): Observable<EducationEntity> {

        const { name, title, text, icons, images, term, status, website, languageCode } = education;

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
                        name, title, text, icons, images, term, status, website, languageCode, user
                    }),
                    ).pipe(
                    map((edu: EducationEntity) => {
                        return edu;
                    }),
                );
            }

        ))


       
    }

}
