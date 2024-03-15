import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("cages")
export class Cage {
  @PrimaryGeneratedColumn("increment")
  id;

  @Column({ type: 'string', length: 150 })
  localizacao;

  @Column({ type: 'boolean', default: true })
  disponibilidade;
}
