import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("item_specifications")
export class ItemSpecification extends BaseEntity {
  @PrimaryColumn({ name: "item_id" })
  itemId: number;

  @PrimaryColumn({ name: "specification_id" })
  specificationId: number;

  @Column({ name: "price_extra", default: 0 })
  priceExtra: number;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;
}
