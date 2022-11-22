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

  @Column()
  upc: string;

  @Column()
  sku: string;

  @Column()
  ean: string;

  @Column()
  gtin: string;

  @Column()
  brand: string;

  @OneToMany(
    () => ItemEspecification,
    (itemEspecification) => itemEspecification.item
  )
  especifications: ItemEspecification[];
}
