import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { getRounds, hashSync } from "bcryptjs";
import { PaymentMethod } from "./PaymentMethod.entity";
import { Notification } from "./Notification.entity";
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

  @Column({ length: 11, unique: true })
  cpf: string;

  @Column({ length: 11, unique: true })
  cel: string;

  @Column({ length: 10 })
  birthdate: string;

  @Column({ default: false })
  admin: boolean;

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @OneToMany(() => PaymentMethod, paymentMethod => paymentMethod.user)
  paymentMethods: PaymentMethod[];

  @OneToMany(() => Notification, notification => notification.user)
  notifications: Notification[];

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

