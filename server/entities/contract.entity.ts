import { Event } from "./event.entity";
import { User } from "./user.entity";
import { Comment } from "./comment.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "typeorm";

@Entity()
export class Contract extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "varchar", length: 255 })
  title: string;
  @Column({ type: "varchar", length: 255 })
  filepath: string;
  @Column({ type: "boolean", default: false })
  approved: boolean;
  @ManyToOne(() => User, (user) => user.contracts)
  initiator: User;
  @ManyToOne(() => Event, (event) => event.contracts)
  event: Event;
}
