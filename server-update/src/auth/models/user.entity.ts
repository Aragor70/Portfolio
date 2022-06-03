import { EducationEntity } from 'src/education/models/education.entity';
import { ExperienceEntity } from 'src/experience/models/experience.entity';
import { ProjectEntity } from 'src/project/models/project.entity';
import {
    Column,
    Entity,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn
  } from 'typeorm';
  
  import { Role } from './role.enum';
  
  @Entity('user')
  export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    firstName: string;
  
    @Column()
    lastName: string;
  
    @Column({ unique: true })
    email: string;
  
    @Column({ select: false })
    password: string;
  
    @Column({ nullable: true })
    imagePath: string;
  
    @Column({ type: 'enum', enum: Role, default: Role.USER })
    role: Role;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;

    @OneToMany(() => EducationEntity, education => education.id)
    educations: EducationEntity[];

    @OneToMany(() => ProjectEntity, project => project.id)
    projects: ProjectEntity[];

    @OneToMany(() => ExperienceEntity, experience => experience.id)
    experiences: ExperienceEntity[];
  
}