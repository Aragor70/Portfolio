import { UserEntity } from 'src/auth/models/user.entity';
import { ImageEntity } from 'src/image/models/image.entity';
import {
    Column,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany
  } from 'typeorm';
import { EducationLanguageVersionEntity } from './educationLanguageVersion.entity';
import { Language } from './language.enum';
  
  import { Status } from './status.enum';
  
  @Entity('education')
  export class EducationEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ nullable: true })
    name: string;
  
    @Column({ type: 'enum', enum: Status, default: Status.CURRENT })
    status: Status;
    
    @Column({ nullable: true })
    website: string;
    
    @Column({ default: false })
    isVisible: boolean;

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
    
    @OneToMany(() => EducationLanguageVersionEntity, languageVersion => languageVersion.education)
    languageVersions: EducationLanguageVersionEntity[]
  
    @ManyToOne(() => UserEntity, user => user.id)
    @JoinColumn()
    user: UserEntity

    @Column({ default: 0 })
    order: number;
    
    @OneToMany(() => ImageEntity, image => image.education_image)
    images: ImageEntity[]
    
    @OneToMany(() => ImageEntity, icon => icon.education_icon)
    icons: ImageEntity[]
}