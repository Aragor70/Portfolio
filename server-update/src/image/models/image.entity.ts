import { ProjectEntity } from 'src/project/models/project.entity';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToMany,
    ManyToOne
  } from 'typeorm';
  
  
  @Entity('image')
  export class ImageEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    label: string;

    @ManyToOne(() => ProjectEntity, project => project.id)
    project_image: ProjectEntity;
    
    @ManyToOne(() => ProjectEntity, project => project.id)
    project_icon: ProjectEntity;
    
}