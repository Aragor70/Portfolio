import { Body, Controller, Get, Param, Put, Query, Req, UseGuards } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ImageService } from './image.service';
import { ImageEntity } from './models/image.entity';

@Controller('image')
export class ImageController {
    
    constructor(private imageService: ImageService) {}

    @Get('')
    getIcons(@Query() query): Observable<ImageEntity[]> {
        return this.imageService.getImages(query).pipe(map((res: ImageEntity[]) => res))
    }

    @UseGuards(JwtGuard)
    @Put(':id')
    includeImage(@Body() formData: any, @Param('id') id: number): Observable<ImageEntity> {
        return this.imageService.updateOne(id, formData).pipe(map((res: ImageEntity) => res));
    }
}
