import { Body, Controller, Get, Post } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { EducationService } from './education.service';
import { EducationEntity } from './models/education.entity';

@Controller('education')
export class EducationController {
    constructor(private educationService: EducationService) {}

    @Get('')
    getAll(): Observable<EducationEntity> {
        return this.educationService.getAll().pipe(map((res: any) => res));
    }
    @Post('')
    create(@Body() education: EducationEntity): Observable<EducationEntity> {
        return this.educationService.createEducation(education).pipe(map((res: any) => res));
    }
}
