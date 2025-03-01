import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntity } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  title: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "text" })
  preview_path: string;

  @Column({ type: "varchar" })
  location: string;

  @Column({ type: "timestamp" })
  start: Date;

  @Column({ type: "timestamp" })
  end: Date;

  @Column("int", { array: true, default: [] })
  likes: number[];

  @ManyToMany(() => User, (user) => user.events, { onDelete: "CASCADE" })
  @JoinTable()
  participants: User[];

  @OneToMany(() => Contract, (contract) => contract.event)
  contracts: Contract[];
}
