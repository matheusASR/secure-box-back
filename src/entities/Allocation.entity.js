import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("cages")
export class Allocation {
    @PrimaryGeneratedColumn("increment")
    id;
  
    @ManyToOne(() => User)
    user;
  
    @ManyToOne(() => Cage)
    cage;
  
    @Column({ type: 'datetime' })
    inicialDatetime;
  
    @Column({ type: 'datetime' })
    finalDatetime;
  
    @Column({ type: 'string', length: 10 })
    price;
  
    @Column({ type: 'boolean', default: false })
    paymentStatus;
}
