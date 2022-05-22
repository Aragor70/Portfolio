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
        return from(this.educationRepository.find())
            .pipe(
            map((message: EducationEntity[]) => {
                return message;
            }),
        );
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
