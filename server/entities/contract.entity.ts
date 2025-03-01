import { Event } from "./event.entity";
import { User } from "./user.entity";
import { Comment } from "./comment.entity";
import { Entity } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Contract {
  @PrimaryGeneratedColumn()
  id: number;
  title: string;
  description: string;
  file_path: string;
  status: string;
  user: User;
  event: Event;
}
