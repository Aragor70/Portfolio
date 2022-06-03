import { ProjectEntity } from './project.entity';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne,
    OneToOne,
  } from 'typeorm';
  
  @Entity('projectRepository')
  export class ProjectRepositoryEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    
    @Column({ nullable: true })
    url: string;

    @Column()
    name: string;
    
    @ManyToOne(() => ProjectEntity, project => project.id)
    @JoinColumn()
    project: ProjectEntity

}