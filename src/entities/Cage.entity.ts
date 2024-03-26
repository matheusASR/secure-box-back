import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("cages")
export class Cage {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 150 })
  location: string;

  @Column({ default: true })
  availability: boolean;

  @Column({ default: false })
  open: boolean;
}