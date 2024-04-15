import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User.entity";

@Entity("adresses")
export class Address {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 100 })
  street: string;

  @Column({ length: 50 })
  number: string;

  @Column({ length: 100 })
  neighborhood: string;

  @Column({ length: 100 })
  city: string;

  @Column({ length: 100 })
  state: string;

  @Column({ length: 20 })
  zipCode: string;

  @Column({ nullable: true, length: 255 })
  complement?: string;

  @OneToOne(() => User)
  @JoinColumn({ name: "userId", referencedColumnName: "id" })
  user: User;
}
