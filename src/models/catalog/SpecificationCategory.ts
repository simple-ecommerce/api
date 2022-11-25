import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Specification } from "./Specification";

@Entity("specification_categories")
export class SpecificationCategory extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ name: "internal_name" })
  internalName: string;

  @OneToMany(() => Specification, (specification) => specification.category)
  specifications: Specification[];
}
