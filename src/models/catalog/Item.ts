import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Company } from "../core";
import { Specification } from "./Specification";

@Entity("items")
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ name: "company_id" })
  companyId: number;

  @ManyToOne(() => Company, (company) => company.items)
  @JoinColumn({ name: "company_id" })
  company: Company;

  @Column()
  name: string;

  @Column({ name: "short_description" })
  shortDescription: string;

  @Column({ name: "long_description" })
  longDescription: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  upc: string;

  @Column({ nullable: true })
  sku: string;

  @Column({ nullable: true })
  ean: string;

  @Column({ nullable: true })
  gtin: string;

  @Column({ nullable: true })
  brand: string;

  @ManyToMany(() => Specification, (specification) => specification.items, {
    eager: true,
  })
  @JoinTable({
    name: "item_specifications",
    joinColumn: {
      name: "item_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "specification_id",
      referencedColumnName: "id",
    },
  })
  specifications: Specification[];

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;
}
