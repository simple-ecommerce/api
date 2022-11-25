import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SpecificationCategory } from "./SpecificationCategory";
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
    (specificationCategory) => specificationCategory.specifications
  )
  @JoinColumn({ name: "specification_category_id" })
  category: SpecificationCategory;

  @OneToMany(
    () => ItemSpecification,
    (itemSpecification) => itemSpecification.specification
  )
  itemSpefications: ItemSpecification[];
}
