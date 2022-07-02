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
        return from(this.imageRepository.findOneOrFail({where: {id}, relations: ['project_image', 'project_icon', 'education_image', 'education_icon', 'experience_image', 'experience_icon', ]}))
            .pipe(
            map((element: ImageEntity) => {
                return element;
            }),
        );
    }

    getImages(payload: any): Observable<ImageEntity[]> {

        const { project_image = null, project_icon = null, education_image = null, education_icon = null, experience_image = null, experience_icon = null } = payload;

        const request = this.imageRepository.createQueryBuilder('image')
        .leftJoinAndSelect('image.project_image', 'project_image')
        .leftJoinAndSelect('image.project_icon', 'project_icon')
        .leftJoinAndSelect('image.education_image', 'education_image')
        .leftJoinAndSelect('image.education_icon', 'education_icon')
        .leftJoinAndSelect('image.experience_image', 'experience_image')
        .leftJoinAndSelect('image.experience_icon', 'experience_icon')

        return from(
            request.getMany()
        )
            .pipe(
            map((element: ImageEntity[]) => {
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
        image.isFile = formData.isFile;
        
        
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

