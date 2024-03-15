import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { getRounds, hashSync } from "bcryptjs";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 45, unique: true })
  email: string;

  @Column({ length: 45 })
  name: string;

  @Column({ length: 120 })
  password: string;

  @Column({ length: 11, unique: true })
  cpf: string;

  @Column({ length: 11, unique: true })
  cel: string;

  @Column({ type: "date" })
  birthdate: string;

  @Column({ type: "jsonb" })
  address: {
    street: string;
    number: number;
    city: string;
    state: string;
    complement?: string;
  };

  @Column({ default: false })
  admin: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const hasRounds = getRounds(this.password);
    if (!hasRounds) {
      this.password = hashSync(this.password, 10);
    }
  }
}
