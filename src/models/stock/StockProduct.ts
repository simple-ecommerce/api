import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Item, ItemEspecification } from "../catalog";

@Entity("stock_products")
export class StockProduct extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "item_id" })
  itemId: number;

  @ManyToOne(() => Item, (item) => item.stockProducts)
  item: Item;

  @Column()
  status: string;

  @OneToMany(
    () => ItemEspecification,
    (itemEspecification) => itemEspecification.stockProducts
  )
  @JoinTable({
    name: "stock_product_especifications",
  })
  especifications: ItemEspecification[];
}
