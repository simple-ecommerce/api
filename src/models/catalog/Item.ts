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
import { Image } from "../core/Image";
import { ItemSpecification } from "./ItemSpecification";
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

  @OneToMany(
    () => ItemSpecification,
    (itemSpecification) => itemSpecification.item
  )
  itemSpecifications: Specification[];

  @OneToMany(() => Image, (image) => image.item, { eager: true })
  images: Image[];

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;
}
