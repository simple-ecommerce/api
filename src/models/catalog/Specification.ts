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
import { SpecificationCategory } from "./SpecificationCategory";
import { Item } from "./Item";
import { ItemSpecification } from "./ItemSpecification";

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

  @OneToMany(
    () => ItemSpecification,
    (itemSpecification) => itemSpecification.specification
  )
  itemSpecifications: ItemSpecification[];

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;
}
