import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  OneToOne,
} from "typeorm";
import { User } from "./User.entity";
import { hashSync, getRounds } from "bcryptjs";

@Entity("payment_methods")
export class PaymentMethod {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Column({ length: 100 })
  cardNumber: string;

  @Column({ length: 100 })
  cardHolderName: string;

  @Column({ length: 5 })
  expirationDate: string;

  @Column({ length: 3 })
  cvv: string;

  @Column({ length: 100 })
  cardType: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashSensitiveData() {
    const rounds = 10; // Número de rounds para o hash
    const hasCardNumberRounds = getRounds(this.cardNumber);
    const hasCvvRounds = getRounds(this.cvv);

    if (!hasCardNumberRounds) {
      this.cardNumber = hashSync(this.cardNumber, rounds);
    }

    if (!hasCvvRounds) {
      this.cvv = hashSync(this.cvv, rounds);
    }
  }
}
