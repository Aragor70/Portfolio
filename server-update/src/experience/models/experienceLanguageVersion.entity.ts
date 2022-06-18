import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne,
    OneToOne,
  } from 'typeorm';
import { Language } from './language.enum';
import { ExperienceEntity } from './experience.entity';
  
  @Entity('experienceLanguageVersionEntity')
  export class ExperienceLanguageVersionEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ nullable: true })
    title: string;
  
    @Column({ nullable: true })
    text: string;
    
    @Column({ type: 'enum', enum: Language, default: Language.ENGLISH })
    languageCode: string;
    
    @ManyToOne(() => ExperienceEntity)
    @JoinColumn()
    experience: ExperienceEntity

}