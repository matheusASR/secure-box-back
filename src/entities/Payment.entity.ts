import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { User } from "./User.entity";

@Entity("payments")
export class Payment {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "decimal" })
  price: number;

  @Column({ length: 100 })
  paymentDate: string;

  @Column({ length: 255 })
  type: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;
}
