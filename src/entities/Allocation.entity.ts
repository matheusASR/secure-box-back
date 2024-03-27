import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";
import { Cage } from "./Cage.entity";

@Entity("allocations")
export class Allocation {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => Cage, { onDelete: 'CASCADE' })
    cage: Cage;

    @Column({ length: 50 })
    initialDatetime: string;

    @Column({ length: 50 })
    finalDatetime: string;

    @Column({ length: 10})
    price: string;

    @Column({ default: false })
    paymentStatus: boolean;

    @Column({ default: false })
    finished: boolean;
}
