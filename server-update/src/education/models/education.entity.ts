import { UserEntity } from 'src/auth/models/user.entity';
import {
    Column,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    JoinColumn
  } from 'typeorm';
  
  import { Status } from './status.enum';
  
  @Entity('education')
  export class EducationEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ nullable: true })
    name: string;
  
    @Column({ nullable: true })
    title: string;
  
    @Column({ nullable: true })
    text: string;
  
    @Column({ nullable: true })
    icons: string[];
  
    @Column({ nullable: true })
    images: string[];
  
    @Column({ type: 'enum', enum: Status, default: Status.CURRENT })
    status: Status;
    
    @Column({ nullable: true })
    website: string;

    @Column({ nullable: true })
    term: string;
  
    @OneToOne(() => UserEntity)
    @JoinColumn()
    user: UserEntity
}