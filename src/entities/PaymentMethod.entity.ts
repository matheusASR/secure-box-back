import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
} from "typeorm";
import { User } from "./User.entity";

@Entity("payment_methods")
export class PaymentMethod {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ManyToOne(() => User, (u) => u.paymentMethods)
  user: User;

  @Column({ length: 120 })
  cardNumber: string;

  @Column({ length: 100 })
  cardHolderName: string;

  @Column({ length: 5 })
  expirationDate: string;

  @Column({ length: 120 })
  cvv: string;

  @Column({ length: 100 })
  cardType: string;

  @Column()
  isDefault: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  hideSensitiveData() {
    // Verifica se o número do cartão de crédito precisa ser ocultado
    if (this.cardNumber.length >= 16) {
      // Substitui os dígitos de 4 a 12 por "X"
      const visibleDigits = this.cardNumber.substring(0, 4) + "X".repeat(8) + this.cardNumber.substring(12);
      this.cardNumber = visibleDigits;
    }

    // Verifica se o CVV precisa ser ocultado
    if (this.cvv.length >= 3) {
      // Substitui todos os dígitos do CVV por "X"
      this.cvv = "X".repeat(this.cvv.length);
    }
  }
}
