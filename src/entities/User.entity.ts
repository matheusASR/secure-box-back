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

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 120 })
  password: string;

  @Column({ length: 11, unique: true })
  cpf: string;

  @Column({ length: 11, unique: true })
  cel: string;

  @Column({ length: 10 })
  birthdate: string;

  @Column({ default: false })
  admin: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  hashSensitiveData() {
    const passwordRounds = 10;
    const cpfRounds = 8; 

    const hasPasswordRounds = getRounds(this.password);
    const hasCpfRounds = getRounds(this.cpf);

    if (!hasPasswordRounds) {
      this.password = hashSync(this.password, passwordRounds);
    }
    if (!hasCpfRounds) {
      this.cpf = hashSync(this.cpf, cpfRounds);
    }
  }
}

