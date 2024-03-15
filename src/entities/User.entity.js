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
  id;

  @Column({ type: 'string', length: 45, unique: true })
  email;

  @Column({ type: 'string', length: 45 })
  name;

  @Column({ type: 'string', length: 120 })
  password;

  @Column({ type: 'number', length: 11, unique: true })
  cpf;

  @Column({ type: 'string', length: 11, unique: true })
  rg;

  @Column({ type: 'number', length: 20, unique: true })
  cel;

  @Column({ type: 'date' })
  birthdate;

  @Column({ type: 'string', length: 150 })
  address;

  @Column({ type: 'boolean', default: false })
  admin;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const hasRounds = getRounds(this.password);
    if (!hasRounds) {
      this.password = hashSync(this.password, 10);
    }
  }
}
