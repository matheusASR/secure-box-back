import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User.entity";

@Entity("wallets") 
export class Wallet {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "decimal" })
  balance: number; 

  @OneToOne(() => User)
  @JoinColumn({ name: "userId", referencedColumnName: "id" })
  user: User;
}