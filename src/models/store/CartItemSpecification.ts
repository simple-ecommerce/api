import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Id } from "../../utils/aliases";

@Entity("cart_item_specifications")
export class CartItemSpecification extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: Id;

  @Column({ name: "cart_item_id" })
  cartItemId: Id;

  @Column({ name: "item_specification_id" })
  itemSpecificationId: Id;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;
}
