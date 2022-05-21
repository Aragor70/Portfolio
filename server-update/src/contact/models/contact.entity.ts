import { UserEntity } from 'src/auth/models/user.entity';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  
  @Entity('education')
  export class EducationEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ nullable: true })
    from: string;
  
    @Column()
    message: string;
}