import { Body, Controller, Get, Post } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ExperienceService } from './experience.service';
import { ExperienceEntity } from './models/experience.entity';


@Controller('experience')
export class ExperienceController {
    constructor(private experienceService: ExperienceService) {}

    @Get('')
    getAll(): Observable<ExperienceEntity> {
        return this.experienceService.getAll().pipe(map((res: any) => res));
    }
    @Post('')
    create(@Body() experience: ExperienceEntity): Observable<ExperienceEntity> {
        return this.experienceService.createExperience(experience).pipe(map((res: any) => res));
    }
}
