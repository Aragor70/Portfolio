import { UserEntity } from 'src/auth/models/user.entity';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    ManyToOne
  } from 'typeorm';
import { Language } from './language.enum';
  
  import { Status } from './status.enum';
  
  @Entity('experience')
  export class ExperienceEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ nullable: true })
    name: string;
  
    @Column({ nullable: true })
    title: string;
  
    @Column({ nullable: true })
    text: string;
  
    @Column('text', { array: true, nullable: true })
    icons: string[];
  
    @Column('text', { array: true, nullable: true })
    images: string[];
  
    @Column({ type: 'enum', enum: Status, default: Status.CURRENT })
    status: Status;
    
    @Column({ nullable: true })
    website: string;

    @Column({ nullable: true })
    term: string;
    
    @Column({ type: 'enum', enum: Language, default: Language.ENGLISH })
    languageCode: string;
    
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;
    
    @ManyToOne(() => UserEntity, user => user.id)
    @JoinColumn()
    user: UserEntity
}