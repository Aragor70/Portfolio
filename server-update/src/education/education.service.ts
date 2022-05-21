import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EducationEntity } from './models/education.entity';
import { from, Observable, of, pipe, map } from 'rxjs';

@Injectable()
export class EducationService {

    
    constructor(
        @InjectRepository(EducationEntity)
        private readonly educationRepository: Repository<EducationEntity>,
    ) {}
    
    
    getAll(): Observable<EducationEntity[]> {
        return from(this.educationRepository.find())
            .pipe(
            map((message: EducationEntity[]) => {
                return message;
            }),
        );
    }
    
    createEducation(education: EducationEntity): Observable<EducationEntity> {

        const { name, title, text, icons, images, term, status, website, languageCode } = education;

        return from(
            this.educationRepository.save({
                name, title, text, icons, images, term, status, website, languageCode
            }),
            ).pipe(
            map((edu: EducationEntity) => {
                return edu;
            }),
        );
    }

}
