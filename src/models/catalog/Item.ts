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
import { StockProduct } from "../stock/StockProduct";
import { ItemEspecification } from "./ItemEspecification";

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
    () => ItemEspecification,
    (itemEspecification) => itemEspecification.item
  )
  especifications: ItemEspecification[];

  @OneToMany(() => StockProduct, (stockProduct) => stockProduct.item)
  stockProducts: StockProduct[];

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;
}
