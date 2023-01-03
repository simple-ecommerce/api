import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { CartItem } from "../store/CartItem";
import { Item } from "./Item";
import { Specification } from "./Specification";

@Entity("item_specifications")
@Index(["itemId", "specificationId"], {
  where: "deleted_at IS NULL",
  unique: true,
})
export class ItemSpecification extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ name: "item_id" })
  itemId: number;

  @Column({ name: "specification_id" })
  specificationId: number;

  @ManyToOne(() => Item, (item) => item.itemSpecifications)
  @JoinColumn({ name: "item_id" })
  item: Item;

  @ManyToOne(
    () => Specification,
    (specification) => specification.itemSpecifications
  )
  @JoinColumn({ name: "specification_id" })
  specification: Specification;

  @Column({ name: "price_extra", default: 0 })
  priceExtra: number;

  @ManyToMany(() => CartItem, (cartItem) => cartItem.specifications)
  cartItems: CartItem[];

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;
}
