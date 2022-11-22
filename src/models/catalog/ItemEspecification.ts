import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Especification } from "./Especification";
import { Item } from "./Item";

@Entity("items_especifications")
export class ItemEspecification extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ name: "item_id" })
  itemId: number;

  @ManyToOne(() => Item, (item) => item.especifications)
  @JoinColumn({ name: "item_id" })
  item: Item;

  @Column({ name: "especification_id" })
  especificationId: number;

  @ManyToOne(
    () => Especification,
    (especification) => especification.itemEspefications
  )
  @JoinColumn({ name: "especification_id" })
  especification: Especification;

  @Column()
  priceExtra: number;
}
