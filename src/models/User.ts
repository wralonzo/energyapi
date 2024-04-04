import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from "typeorm";
import { Client } from "./Client";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
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

  @OneToMany(() => Client, (client) => client.clientFk)
  clientFk: Client;
}
