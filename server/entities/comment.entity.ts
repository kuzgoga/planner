import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "typeorm";
import { User } from "./user.entity";
import { ManyToOne } from "typeorm";

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: "CASCADE" })
  author: User;

  @Column({ type: "text" })
  content: string;

  @Column({ type: "timestamp", default: "now()" })
  created_at: Date;
}
