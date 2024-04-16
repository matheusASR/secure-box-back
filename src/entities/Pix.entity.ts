import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("pix")
export class Pix {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  endToEndId: string;

  @Column()
  txid: string;

  @Column()
  valor: string;

  @Column()
  horario: string;

  @Column()
  chave: string;
}
