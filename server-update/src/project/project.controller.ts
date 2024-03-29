import { Body, Controller, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ProjectService } from './project.service';
import { ProjectEntity } from './models/project.entity';
import { JwtGuard } from 'src/auth/guards/jwt.guard';


@Controller('project')
export class ProjectController {
    
    constructor(private projectService: ProjectService) {}

    @Get('')
    getAll(@Query() query): Observable<ProjectEntity> {
        return this.projectService.getAll(query).pipe(map((res: any) => res));
    }
    @Get(':value')
    getOne(@Param('value') value: string | number): Observable<ProjectEntity> {

        return this.projectService.getOne(value).pipe(map((res: ProjectEntity) => res));
    }
    @UseGuards(JwtGuard)
    @Post('')
    create(@Body() project: ProjectEntity, @Req() req): Observable<ProjectEntity> {
        const { id } = req.user;
        return this.projectService.createProject(project, id).pipe(map((res: ProjectEntity) => res));
    }
    @UseGuards(JwtGuard)
    @Put('')
    edit(@Body() project: ProjectEntity, @Req() req): Observable<ProjectEntity> {
        const { id } = req.user;
        return this.projectService.editProject(project, id).pipe(map((res: ProjectEntity) => res));
    }
    @UseGuards(JwtGuard)
    @Put('image/:type')
    includeImage(@Body() formData: any, @Req() req, @Param('type') type: "project_icon" | "project_image"): Observable<ProjectEntity> {
        const { id } = req.user;
        return this.projectService.includeImage(formData, id, type).pipe(map((res: ProjectEntity) => res));
    }
    @UseGuards(JwtGuard)
    @Put('repository/:type')
    includeRepository(@Body() formData: any, @Req() req, @Param('type') type: "include" | "exclude"): Observable<ProjectEntity> {
        const { id } = req.user;
        return this.projectService.includeRepository(formData, id, type).pipe(map((res: ProjectEntity) => res));
    }
    @UseGuards(JwtGuard)
    @Put('status/:type')
    includeStatus(@Body() formData: any, @Req() req, @Param('type') type: "include" | "exclude"): Observable<ProjectEntity> {
        const { id } = req.user;
        return this.projectService.includeStatus(formData, id, type).pipe(map((res: ProjectEntity) => res));
    }

}
