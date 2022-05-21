import { UserEntity } from 'src/auth/models/user.entity';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn
  } from 'typeorm';
  
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
  
    @Column({ nullable: true })
    icons: string[];
  
    @Column({ nullable: true })
    images: string[];
  
    @Column({ type: 'enum', enum: Status, default: Status.ONGOING })
    status: Status;
    
    @Column({ nullable: true })
    website: string;

    @Column({ nullable: true })
    repository: string;
    
    @OneToOne(() => UserEntity)
    @JoinColumn()
    user: UserEntity
}