import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
  } from "typeorm";
  
  @Entity("addresses")
  export class Address {
    @PrimaryGeneratedColumn("increment")
    id: number;
  
    @Column({ length: 50 })
    street: string;
  
    @Column({ length: 50 })
    number: string;
  
    @Column({ length: 10 })
    city: string;
  
    @Column()
    state: string;
  
    @Column({ nullable: true })
    complement?: string;
  }
  