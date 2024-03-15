import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("cages")
export class Cage {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 150 })
  localizacao: string;

  @Column({ default: true })
  disponibilidade: boolean;
}