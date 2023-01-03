import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Id } from "../../utils/aliases";
import { Customer } from "../core";
import { CartItem } from "./CartItem";

@Entity("carts")
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: Id;

  @Column({ name: "session_token" })
  session_token: string;

  @Column({ name: "customer_id", nullable: true })
  customerId: Id;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  items: CartItem[];

  @OneToOne(() => Customer, (customer) => customer.cart, { nullable: true })
  customer: Customer | null;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;
}
