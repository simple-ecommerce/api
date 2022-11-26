import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Company } from "../core";
import { Specification } from "./Specification";

@Entity("specification_categories")
export class SpecificationCategory extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ name: "company_id" })
  companyId: number;

  @Column({ name: "internal_name" })
  internalName: string;

  @OneToMany(() => Specification, (specification) => specification.category)
  specifications: Specification[];

  @ManyToOne(() => Company, (company) => company.specificationCategories)
  @JoinColumn({ name: "company_id" })
  company: Company;
}
