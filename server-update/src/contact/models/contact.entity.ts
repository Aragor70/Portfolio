import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn
  } from 'typeorm';
  
  
  @Entity('contact')
  export class ContactEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ nullable: true })
    from: string;
  
    @Column()
    message: string;
  
    @Column({ nullable: true })
    ip: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;
}