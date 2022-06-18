import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne,
    OneToOne,
  } from 'typeorm';
import { EducationEntity } from './education.entity';
import { Language } from './language.enum';
  
  @Entity('educationLanguageVersionEntity')
  export class EducationLanguageVersionEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ nullable: true })
    title: string;
  
    @Column({ nullable: true })
    text: string;
    
    @Column({ type: 'enum', enum: Language, default: Language.ENGLISH })
    languageCode: string;
    
    @ManyToOne(() => EducationEntity)
    @JoinColumn()
    education: EducationEntity

}