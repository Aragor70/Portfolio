import { Body, Controller, Get, Post } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ProjectService } from './project.service';
import { ProjectEntity } from './models/project.entity';


@Controller('project')
export class ProjectController {
    
    constructor(private projectService: ProjectService) {}

    @Get('')
    getAll(): Observable<ProjectEntity> {
        return this.projectService.getAll().pipe(map((res: any) => res));
    }
    @Post('')
    create(@Body() project: ProjectEntity): Observable<ProjectEntity> {
        return this.projectService.createProject(project).pipe(map((res: any) => res));
    }

}
