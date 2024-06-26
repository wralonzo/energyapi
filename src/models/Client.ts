import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { MeterType } from "./MeterType";
import { User } from "./User";
import { CounterTracking } from "./Counter";
// import { Counter } from "./Counter";

@Entity()
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  clientType: string;

  @Column()
  idMeterType: number;

  @Column()
  idUser: number;

  @Column({ nullable: true })
  coments: string;

  @Column({ nullable: true, unique: true })
  numeroMedidor: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  alert: string;

  @CreateDateColumn()
  dataCreated: Date;

  @UpdateDateColumn()
  dateUpdated: Date;

  @DeleteDateColumn()
  dateDeleted: Date;

  @ManyToOne(() => MeterType, (meterType) => meterType.meterTypeFk, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "idMeterType", referencedColumnName: "id" }])
  meterTypeFk: MeterType;

  @ManyToOne(() => User, (user) => user.clientFk, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "idUser", referencedColumnName: "id" }])
  clientFk: User;

  @OneToMany(() => CounterTracking, (counter) => counter.counterTrackingFk)
  counterTrackingFk: CounterTracking[];
}
