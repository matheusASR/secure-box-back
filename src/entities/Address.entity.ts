import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { User } from "./User.entity";

@Entity("addresses")
export class Address {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 100 })
  street: string;

  @Column({ length: 50 })
  number: string;

  @Column({ length: 100 })
  city: string;

  @Column({ length: 100 })
  state: string;

  @Column({ nullable: true, length: 255 })
  complement?: string;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  user: User;
}
