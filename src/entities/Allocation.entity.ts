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
    initial_datetime: string;

    @Column({ length: 50 })
    final_datetime: string;

    @Column({ length: 10})
    price: string;

    @Column()
    payment_status: boolean;

    @Column()
    finished: boolean;
}
