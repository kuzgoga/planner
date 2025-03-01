import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntity } from "typeorm";
import { Event } from "./event.entity";
import { Comment } from "./comment.entity";
import { Role } from "../models/role";


@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  email: string;

  @Column({ type: "varchar" })
  firstName: string;

  @Column({ type: "varchar" })
  lastName: string;

  @Column({ type: "varchar", default: "" })
  avatar: string;

  @Column({ type: "varchar" })
  password_hash: string;

  @Column({ type: "enum", enum: Role })
  role: Role;

  @ManyToMany(() => Event, (event) => event.participants, {
    onDelete: "CASCADE",
  })
  events: Event[];

  @OneToMany(() => Comment, (comment) => comment.author, {
    onDelete: "CASCADE",
  })
  comments: Comment[];

  @OneToMany(() => Contract, (contract) => contract.initiator, {
    onDelete: "CASCADE",
  })
  contracts: Contract[];
}
