import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ExperienceService } from './experience.service';
import { ExperienceEntity } from './models/experience.entity';


@Controller('experience')
export class ExperienceController {
    constructor(private experienceService: ExperienceService) {}

    @UseGuards(JwtGuard)
    @Get('')
    getAll(): Observable<ExperienceEntity> {
        return this.experienceService.getAll().pipe(map((res: any) => res));
    }
    @UseGuards(JwtGuard)
    @Post('')
    create(@Body() experience: ExperienceEntity, @Req() req): Observable<ExperienceEntity> {
        const { id } = req.user;
        return this.experienceService.createExperience(experience, id).pipe(map((res: any) => res));
    }
}
