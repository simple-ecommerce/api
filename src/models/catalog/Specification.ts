import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { SpecificationCategory } from "./SpecificationCategory";
import { Item } from "./Item";

@Entity("specifications")
export class Specification extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ name: "specification_category_id" })
  specificationCategoryId: number;

  @ManyToOne(
    () => SpecificationCategory,
    (specificationCategory) => specificationCategory.specifications,
    { eager: true }
  )
  @JoinColumn({ name: "specification_category_id" })
  category: SpecificationCategory;

  @ManyToMany(() => Item, (item) => item.specifications)
  items: Item[];

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;
}
