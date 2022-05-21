import { UserEntity } from 'src/auth/models/user.entity';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn
  } from 'typeorm';
import { Language } from './language.enum';
  
  import { Status } from './status.enum';
  
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
  
    @Column('text', { array: true, nullable: true })
    icons: string[];
  
    @Column('text', { array: true, nullable: true })
    images: string[];
  
    @Column({ type: 'enum', enum: Status, default: Status.ONGOING })
    status: Status;
    
    @Column({ nullable: true })
    website: string;

    @Column({ nullable: true })
    repository: string;
    
    @Column({ type: 'enum', enum: Language, default: Language.ENGLISH })
    languageCode: string;
    
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;
    
    @OneToOne(() => UserEntity)
    @JoinColumn()
    user: UserEntity
}