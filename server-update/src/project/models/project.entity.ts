import { UserEntity } from 'src/auth/models/user.entity';
import { ImageEntity } from '../../image/models/image.entity';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany
  } from 'typeorm';
import { Language } from './language.enum';
  
import { ProjectStatusEntity } from './projectStatus.entity';
import { ProjectRepositoryEntity } from './projectRepository.entity';
import { ProjectLanguageVersionEntity } from './projectLanguageVersion.entity';
  
  @Entity('project')
  export class ProjectEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ nullable: true })
    name: string;
    
    @Column({ nullable: true })
    website: string;
    
    @Column({ default: false })
    isVisible: boolean;
    
    @Column({ type: 'enum', enum: Language, default: Language.ENGLISH })
    languageCode: string;
    
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    started_at: Date;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;
    
    @ManyToOne(() => UserEntity, user => user.id)
    @JoinColumn()
    user: UserEntity
    
    @OneToMany(() => ProjectRepositoryEntity, repository => repository.project)
    repositories: ProjectRepositoryEntity[]

    @OneToOne(() => ProjectStatusEntity)
    @JoinColumn()
    status: ProjectStatusEntity

    @OneToMany(() => ProjectLanguageVersionEntity, languageVersion => languageVersion.project)
    languageVersions: ProjectLanguageVersionEntity[]

    @OneToMany(() => ImageEntity, image => image.project_image)
    images: ImageEntity[]
    
    @OneToMany(() => ImageEntity, icon => icon.project_icon)
    icons: ImageEntity[]

}