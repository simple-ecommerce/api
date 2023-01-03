import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  DeleteDateColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
  OneToOne,
} from "typeorm";
import { PasswordHasher } from "../../services/passwords/hasher/hasher";
import { RefreshToken } from "../authentication";
import { Cart } from "../store/Cart";
import { Company } from "./Company";

@Entity("customers")
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ name: "company_id" })
  companyId: number;

  @ManyToOne(() => Company, (company) => company.customers, { eager: true })
  @JoinColumn({ name: "company_id" })
  company: Company;

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.customer)
  refreshTokens: Customer[];

  @OneToOne(() => Cart, (cart) => cart.customer, { nullable: true })
  cart: Cart | null;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await PasswordHasher.hash({ password: this.password });
    }
  }
}
