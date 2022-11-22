import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Especification } from "./Especification";

@Entity("especifications_types")
export class EspecificationType extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Especification, (especification) => especification.type)
  especifications: Especification[];
}
