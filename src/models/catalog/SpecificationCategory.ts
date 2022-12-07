import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @Column({ name: "internal_name", nullable: true })
  internalName: string;

  @OneToMany(() => Specification, (specification) => specification.category)
  specifications: Specification[];

  @ManyToOne(() => Company, (company) => company.specificationCategories)
  @JoinColumn({ name: "company_id" })
  company: Company;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;
}
