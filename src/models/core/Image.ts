import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Item } from "../catalog";

@Entity("images")
export class Image extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  src: string;

  @Column({ name: "file_name" })
  fileName: string;

  @Column({ name: "item_id", nullable: true })
  itemId: number;

  @Column({ default: 0 })
  index: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;

  @ManyToOne(() => Item, (item) => item.images)
  @JoinColumn({ name: "item_id" })
  item: Item;
}
