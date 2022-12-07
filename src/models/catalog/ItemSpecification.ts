import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Item } from "./Item";
import { Specification } from "./Specification";

@Entity("item_specifications")
export class ItemSpecification extends BaseEntity {
  @PrimaryColumn({ name: "item_id" })
  itemId: number;

  @PrimaryColumn({ name: "specification_id" })
  specificationId: number;

  @ManyToOne(() => Item, (item) => item.id)
  @JoinColumn({ name: "item_id" })
  item: Item;

  @ManyToOne(() => Specification, (specification) => specification.id)
  @JoinColumn({ name: "specification_id" })
  specification: Specification;

  @Column({ name: "price_extra", default: 0 })
  priceExtra: number;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;
}
