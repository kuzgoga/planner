import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "typeorm";
import { OneToMany } from "typeorm/browser";
import { User } from "./user.entity";
import { ManyToOne } from "typeorm/browser";

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.comments)
  author: User;

  @Column({ type: "text" })
  content: string;

  @Column({ type: "timestamptz" })
  created_at: Date;
}
