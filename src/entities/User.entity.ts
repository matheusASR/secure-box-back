import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { getRounds, hashSync } from "bcryptjs";
import { PaymentMethod } from "./PaymentMethod.entity";
import { Wallet } from "./Wallet.entity";
import { Address } from "./Address.entity";

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

  @Column({ length: 120, unique: true })
  cpf: string;

  @Column({ length: 11, unique: true })
  cel: string;

  @Column({ length: 10 })
  birthdate: string;

  @Column({ default: false })
  admin: boolean;

  @OneToMany(() => PaymentMethod, (pm) => pm.user, {onDelete: 'CASCADE'})
  paymentMethods: Array<PaymentMethod>

  @OneToOne(() => Wallet, (w) => w.user, {onDelete: 'CASCADE'})
  wallet: Wallet

  @OneToOne(() => Address, (a) => a.user, {onDelete: 'CASCADE'})
  address: Address

  @BeforeInsert()
  @BeforeUpdate()
  hashSensitiveData() {
    const passwordRounds = 10;

    const hasPasswordRounds = getRounds(this.password);

    if (!hasPasswordRounds) {
      this.password = hashSync(this.password, passwordRounds);
    }
  }
}

