import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ProjectService } from './project.service';
import { ProjectEntity } from './models/project.entity';
import { JwtGuard } from 'src/auth/guards/jwt.guard';


@Controller('project')
export class ProjectController {
    
    constructor(private projectService: ProjectService) {}

    @Get('')
    getAll(): Observable<ProjectEntity> {
        return this.projectService.getAll().pipe(map((res: any) => res));
    }
    @UseGuards(JwtGuard)
    @Post('')
    create(@Body() project: ProjectEntity, @Req() req): Observable<ProjectEntity> {
        const { id } = req.user;
        return this.projectService.createProject(project, id).pipe(map((res: any) => res));
    }

}
