import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EspecificationType } from "./EspecificationType";
import { ItemEspecification } from "./ItemEspecification";

@Entity("especifications")
export class Especification extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ name: "expecification_type_id" })
  especificationTypeId: number;

  @ManyToOne(
    () => EspecificationType,
    (especificationType) => especificationType.especifications
  )
  @JoinColumn({ name: "expecification_type_id" })
  type: EspecificationType;

  @OneToMany(
    () => ItemEspecification,
    (itemEspecification) => itemEspecification.especification
  )
  itemEspefications: ItemEspecification[];
}
