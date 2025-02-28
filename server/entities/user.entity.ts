import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "typeorm";

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
}
