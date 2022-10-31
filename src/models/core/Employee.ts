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
} from "typeorm";
import { Company } from "./Company";

@Entity("employees")
export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  email: string;

  @Column()
  isAdmin: boolean;

  @Column()
  password: string;

  @Column()
  companyId: number;

  @ManyToOne(() => Company, (company) => company.customers)
  @JoinColumn({ name: "companyId" })
  company: Company;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
