import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("employee_companies")
export class EmployeeCompany extends BaseEntity {
  @Column({ name: "employee_id" })
  @PrimaryColumn()
  employeeId: number;

  @Column({ name: "company_id" })
  @PrimaryColumn()
  companyId: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;
}
