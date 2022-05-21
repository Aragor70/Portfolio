import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  
  @Entity('education')
  export class ContactEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ nullable: true })
    from: string;
  
    @Column()
    message: string;
}