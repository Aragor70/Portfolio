import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExperienceEntity } from './models/experience.entity';
import { from, Observable, of, pipe, map } from 'rxjs';


@Injectable()
export class ExperienceService {
    
    constructor(
        @InjectRepository(ExperienceEntity)
        private readonly experienceRepository: Repository<ExperienceEntity>,
    ) {}
    
    
    getAll(): Observable<ExperienceEntity[]> {
        return from(this.experienceRepository.find())
            .pipe(
            map((elements: ExperienceEntity[]) => {
                return elements;
            }),
        );
    }
    
    createExperience(experience: ExperienceEntity): Observable<ExperienceEntity> {

        const { name, title, text, icons, images, term, status, website, languageCode } = experience;

        return from(
            this.experienceRepository.save({
                name, title, text, icons, images, term, status, website, languageCode
            }),
            ).pipe(
            map((element: ExperienceEntity) => {
                return element;
            }),
        );
    }

}
