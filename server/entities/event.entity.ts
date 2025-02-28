import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
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

  @Column({ type: "timestamp" })
  time: Date;

  @Column({ type: "bigint" })
  likes: number;

  @ManyToMany(() => User, (user) => user.events)
  @JoinTable()
  participants: User[];
}
