import { UserEntity } from 'src/auth/models/user.entity';
import { ImageEntity } from 'src/image/models/image.entity';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    ManyToOne,
    OneToMany
  } from 'typeorm';
import { ExperienceLanguageVersionEntity } from './experienceLanguageVersion.entity';
import { Language } from './language.enum';
  
  import { Status } from './status.enum';
  
  @Entity('experience')
  export class ExperienceEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ nullable: true })
    name: string;
  
    @Column({ type: 'enum', enum: Status, default: Status.CURRENT })
    status: Status;
    
    @Column({ nullable: true })
    website: string;

    @Column({ nullable: true })
    term: string;
    
    @Column({ type: 'enum', enum: Language, default: Language.ENGLISH })
    languageCode: string;
    
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    started_at: Date;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;
    
    @Column({ default: false })
    isVisible: boolean;
    
    @OneToMany(() => ExperienceLanguageVersionEntity, languageVersion => languageVersion.experience)
    languageVersions: ExperienceLanguageVersionEntity[]
    
    @ManyToOne(() => UserEntity, user => user.id)
    @JoinColumn()
    user: UserEntity

    @Column({ default: 0 })
    order: number;
    
    @OneToMany(() => ImageEntity, image => image.experience_image)
    images: ImageEntity[]
    
    @OneToMany(() => ImageEntity, icon => icon.experience_icon)
    icons: ImageEntity[]
}