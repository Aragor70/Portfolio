import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { EducationService } from './education.service';
import { EducationEntity } from './models/education.entity';

@Controller('education')
export class EducationController {
    constructor(private educationService: EducationService) {}
    
    @Get('')
    getAll(): Observable<EducationEntity> {
        return this.educationService.getAll().pipe(map((res: any) => res));
    }
    @UseGuards(JwtGuard)
    @Post('')
    create(@Body() education: EducationEntity, @Req() req): Observable<EducationEntity> {
        const { id } = req.user;
        return this.educationService.createEducation(education, id).pipe(map((res: any) => res));
    }
    @UseGuards(JwtGuard)
    @Put('')
    edit(@Body() education: EducationEntity, @Req() req): Observable<EducationEntity> {
        const { id } = req.user;
        return this.educationService.editEducation(education, id).pipe(map((res: any) => res));
    }
}
