import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExperienceEntity } from './models/experience.entity';
import { from, Observable, map, tap, switchMap } from 'rxjs';
import { UserService } from 'src/auth/services/user/user.service';
import { UserEntity } from 'src/auth/models/user.entity';


@Injectable()
export class ExperienceService {
    
    constructor(
        @InjectRepository(ExperienceEntity)
        private readonly experienceRepository: Repository<ExperienceEntity>,
        private readonly userService: UserService,
    ) {}
    
    
    getAll(): Observable<ExperienceEntity[]> {
        return from(this.experienceRepository.find())
            .pipe(
            map((elements: ExperienceEntity[]) => {
                return elements;
            }),
        );
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
