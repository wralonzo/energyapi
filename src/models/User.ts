import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
} from "typeorm";
import { Client } from "./Client";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  role: string;

  @Column()
  password: string;

  @Column()
  user: string;

  @Column()
  email: string;

  @Column({ length: 20, nullable: true })
  phone: string;

  @Column({ nullable: true })
  lastAccess: Date;

  @CreateDateColumn()
  dataCreated: Date;

  @UpdateDateColumn()
  dateUpdated: Date;

  @DeleteDateColumn()
  dateDeleted: Date;

  @OneToOne(() => Client, (client) => client.clientFk)
  clientFk: Client;
}
