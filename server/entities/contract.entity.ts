import { Event } from "./event.entity";
import { User } from "./user.entity";
import { Comment } from "./comment.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Contract {
  @PrimaryGeneratedColumn()
  id: number;
  title: string;
  file_path: string;
  @Column({ type: "boolean", default: false })
  approved: boolean;
  @ManyToOne(() => User, (user) => user.contracts)
  initiator: User;
  event: Event;
}
