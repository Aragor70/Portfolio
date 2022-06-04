import { ProjectEntity } from './project.entity';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne,
    OneToOne,
  } from 'typeorm';
import { Language } from './language.enum';
  
  @Entity('projectLanguageVersion')
  export class ProjectLanguageVersionEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ nullable: true })
    title: string;
  
    @Column({ nullable: true })
    text: string;
    
    @Column({ type: 'enum', enum: Language, default: Language.ENGLISH })
    languageCode: string;
    
    @ManyToOne(() => ProjectEntity)
    @JoinColumn()
    project: ProjectEntity

}