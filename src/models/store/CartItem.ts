import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Id } from "../../utils/aliases";
import { Item, ItemSpecification } from "../catalog";
import { Cart } from "./Cart";

@Entity("cart_items")
export class CartItem extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: Id;

  @Column({ name: "item_id" })
  itemId: Id;

  @Column({ name: "cart_id" })
  cartId: Id;

  @OneToMany(() => Item, (item) => item.cartItems)
  item: Item;

  @ManyToOne(() => Cart, (cart) => cart.items)
  cart: Cart;

  @ManyToMany(
    () => ItemSpecification,
    (itemSpecification) => itemSpecification.cartItems
  )
  @JoinTable({
    name: "cart_item_specifications",
    joinColumn: {
      name: "cart_item_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "item_specification_id",
      referencedColumnName: "id",
    },
  })
  specifications: ItemSpecification[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;
}
