import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ExperienceService } from './experience.service';
import { ExperienceEntity } from './models/experience.entity';


@Controller('experience')
export class ExperienceController {
    constructor(private experienceService: ExperienceService) {}

    @Get('')
    getAll(): Observable<ExperienceEntity> {
        return this.experienceService.getAll().pipe(map((res: any) => res));
    }
    @Get(':id')
    getOne(@Param('id') id: number): Observable<ExperienceEntity> {
        return this.experienceService.getOne(id).pipe(map((res: any) => res));
    }
    @UseGuards(JwtGuard)
    @Post('')
    create(@Body() experience: ExperienceEntity, @Req() req): Observable<ExperienceEntity> {
        const { id } = req.user;
        return this.experienceService.createExperience(experience, id).pipe(map((res: any) => res));
    }
    @UseGuards(JwtGuard)
    @Put('')
    edit(@Body() experience: ExperienceEntity, @Req() req): Observable<ExperienceEntity> {
        const { id } = req.user;
        return this.experienceService.editExperience(experience, id).pipe(map((res: any) => res));
    }
    @UseGuards(JwtGuard)
    @Put(':type')
    includeImage(@Body() formData: any, @Req() req, @Param('type') type: "experience_icon" | "experience_image"): Observable<ExperienceEntity> {
        const { id } = req.user;
        return this.experienceService.includeImage(formData, id, type).pipe(map((res: any) => res));
    }
}
