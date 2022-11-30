import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
} from "typeorm";
import { Item, SpecificationCategory } from "../catalog";
import { Customer } from "./Customer";
import { Employee } from "./Employee";

@Entity("companies")
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Customer, (customer) => customer.company)
  customers: Customer[];

  @ManyToMany(() => Employee, (employee) => employee.companies)
  employees: Employee[];

  @OneToMany(
    () => SpecificationCategory,
    (specificationCategory) => specificationCategory.company
  )
  specificationCategories: SpecificationCategory[];

  @OneToMany(() => Item, (item) => item.company)
  items: Item[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;
}
