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
  
  @Entity('project')
  export class ProjectEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ nullable: true })
    name: string;
  
    @Column({ nullable: true })
    title: string;
  
    @Column({ nullable: true })
    text: string;
    
    @Column({ nullable: true })
    website: string;
    
    @Column({ type: 'enum', enum: Language, default: Language.ENGLISH })
    languageCode: string;
    
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;
    
    @ManyToOne(() => UserEntity, user => user.id)
    @JoinColumn()
    user: UserEntity
    
    @OneToMany(() => ProjectRepositoryEntity, repository => repository.id)
    repositories: ProjectRepositoryEntity[]

    @OneToOne(() => ProjectStatusEntity, status => status.id)
    @JoinColumn()
    status: ProjectStatusEntity

    @OneToMany(() => ImageEntity, image => image.project_image)
    images: ImageEntity[]
    
    @OneToMany(() => ImageEntity, icon => icon.project_icon)
    icons: ImageEntity[]

}