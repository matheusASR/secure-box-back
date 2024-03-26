import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from "typeorm";
import { User } from "./User.entity";
  
  @Entity("notifications")
  export class Notification {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @ManyToOne(() => User, user => user.notifications)
    @JoinColumn({ name: "user_id" })
    user: User;
  
    @Column({ length: 100 })
    title: string;
  
    @Column("text")
    body: string;
  
    @Column({ type: "jsonb", nullable: true })
    data: any;
  
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    sentAt: Date;
  
    @Column({ default: false })
    status: boolean;
  
    @Column({ length: 20 })
    type: string;
  
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
  
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt: Date;
  }
  