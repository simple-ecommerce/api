import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
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

  @ManyToMany((type) => Company, (company) => company.employees, {
    eager: true,
  })
  @JoinTable({
    name: "employee_companies",
    joinColumn: {
      name: "employee_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "company_id",
      referencedColumnName: "id",
    },
  })
  companies: Company[];

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.employee)
  refreshTokens: RefreshToken[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;
}
