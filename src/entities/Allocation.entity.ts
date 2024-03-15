import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";
import { Cage } from "./Cage.entity";

@Entity("allocations")
export class Allocation {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @ManyToOne(() => User)
    user: User;

    @ManyToOne(() => Cage)
    cage: Cage;

    @Column({ length: 50 })
    inicialDatetime: string;

    @Column({ length: 50 })
    finalDatetime: string;

    @Column({ length: 10 })
    price: string;

    @Column({ default: false })
    paymentStatus: boolean;
}
