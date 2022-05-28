import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, Observable, switchMap } from 'rxjs';
import { Repository } from 'typeorm';
import { ImageEntity } from './models/image.entity';

@Injectable()
export class ImageService {
    
    constructor(
        @InjectRepository(ImageEntity)
        private readonly imageRepository: Repository<ImageEntity>,
    ) {}
    
    getOne(id: number): Observable<ImageEntity> {
        return from(this.imageRepository.findOneOrFail({where: {id}, relations: ['project_image', 'project_icon']}))
            .pipe(
            map((element: ImageEntity) => {
                return element;
            }),
        );
    }
    
    updateOne(id: number, value: any): Observable<ImageEntity> {
        return from(this.imageRepository.update(id, value))
            .pipe(
                switchMap(() => {
                    return this.getOne(id).pipe(
                        map((element: ImageEntity) => {
                            return element;
                        }),
                    )
                })
            
        );
    }
    
    saveImage(formData: ImageEntity): Observable<ImageEntity> {
        
        
        const image: ImageEntity = new ImageEntity();
        image.name = formData.name;
        image.label = formData.label;
        
        
        return from(this.imageRepository.save(image)).pipe(
            switchMap((image: ImageEntity) => {
                return this.getOne(image.id).pipe(
                    map((element: ImageEntity) => {
                        return element;
                    })
                )
            })
            
        )
    }

    
}

