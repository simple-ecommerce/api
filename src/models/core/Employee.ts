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
} from "typeorm";
import { RefreshToken } from "../authentication";
import { Company } from "./Company";

@Entity("employees")
export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  email: string;

  @Column({ name: "is_admin" })
  isAdmin: boolean;

  @Column()
  password: string;

  @Column({ name: "company_id" })
  companyId: number;

  @ManyToOne(() => Company, (company) => company.employees)
  @JoinColumn({ name: "company_id" })
  company: Company;

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.employee)
  refreshTokens: RefreshToken[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;
}