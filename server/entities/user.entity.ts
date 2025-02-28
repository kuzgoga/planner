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

  @Column({ type: "varchar" })
  password_hash: string;

  @Column({ type: "varchar" })
  role: string;

  @ManyToMany(() => Event, (event) => event.participants)
  events: Event[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];
}
