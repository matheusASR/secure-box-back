import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { User } from "./User.entity";

@Entity("notifications")
export class Notification {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Column({ length: 100 })
  title: string;

  @Column("text")
  content: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  sentAt: Date;

  @Column({ default: false })
  status: boolean;

  @Column({ length: 255 })
  type: string;
}
