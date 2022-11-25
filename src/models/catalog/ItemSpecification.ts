import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { StockProduct } from "../stock/StockProduct";
import { Specification } from "./Specification";
import { Item } from "./Item";

@Entity("items_specifications")
export class ItemSpecification extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ name: "item_id" })
  itemId: number;

  @ManyToOne(() => Item, (item) => item.specifications)
  @JoinColumn({ name: "item_id" })
  item: Item;

  @Column({ name: "specification_id" })
  specificationId: number;

  @ManyToOne(
    () => Specification,
    (specification) => specification.itemSpefications
  )
  @JoinColumn({ name: "specification_id" })
  specification: Specification;

  @Column()
  priceExtra: number;

  @ManyToMany(() => StockProduct, (stockProduct) => stockProduct.specifications)
  @JoinTable({
    name: "stock_product_specifications",
  })
  stockProducts: StockProduct[];
}
