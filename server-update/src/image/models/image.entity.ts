import { EducationEntity } from 'src/education/models/education.entity';
import { ExperienceEntity } from 'src/experience/models/experience.entity';
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

    @ManyToOne(() => ExperienceEntity, experience => experience.id)
    experience_image: ExperienceEntity;
    
    @ManyToOne(() => ExperienceEntity, experience => experience.id)
    experience_icon: ExperienceEntity;

    @ManyToOne(() => EducationEntity, education => education.id)
    education_image: EducationEntity;
    
    @ManyToOne(() => EducationEntity, education => education.id)
    education_icon: EducationEntity;
    
}