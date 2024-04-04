import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Client } from "./Client";

@Entity()
export class CounterTracking extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  idClient: number;

  @Column("decimal", { precision: 12, scale: 2 })
  monto: number;

  @Column("decimal", { precision: 12, scale: 2 })
  price: number;

  @Column("decimal", { precision: 12, scale: 2 })
  previus: number;

  @Column("decimal", { precision: 12, scale: 2 })
  before: number;

  @Column()
  status: number;

  @CreateDateColumn()
  dataCreated: Date;

  @UpdateDateColumn()
  dateUpdated: Date;

  @DeleteDateColumn()
  dateDeleted: Date;

  @ManyToOne(() => Client, (user) => user.counterTrackingFk, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "idClient", referencedColumnName: "id" }])
  counterTrackingFk: Client;
}
