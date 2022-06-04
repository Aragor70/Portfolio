import { ProjectEntity } from './project.entity';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne,
    OneToOne,
  } from 'typeorm';
  
  import { Status } from './status.enum';
  
  @Entity('projectStatus')
  export class ProjectStatusEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'enum', enum: Status, default: Status.ONGOING })
    status: Status;
  
    @Column({ default: 0 })
    order: number;
    
    @OneToOne(() => ProjectEntity)
    @JoinColumn()
    project: ProjectEntity

}