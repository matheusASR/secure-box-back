import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    BeforeInsert,
    BeforeUpdate,
  } from "typeorm";
  import { User } from "./User.entity";
  import { hashSync, getRounds } from "bcryptjs";
  
  @Entity("payment_methods")
  export class PaymentMethod {
    @PrimaryGeneratedColumn("increment")
    id: number;
  
    @ManyToOne(() => User, user => user.paymentMethods)
    @JoinColumn({ name: "user_id" })
    user: User;
  
    @Column({ length: 100 })
    cardNumber: string;
  
    @Column({ length: 100 })
    cardHolderName: string;
  
    @Column({ length: 5 })
    expirationDate: string;
  
    @Column({ length: 3 })
    cvv: string;
  
    @Column({ length: 20 })
    cardType: string;
  
    @Column({ default: false })
    isDefault: boolean;
  
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
  
  