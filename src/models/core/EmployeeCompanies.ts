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
  @PrimaryColumn({ name: "employee_id" })
  employeeId: number;

  @PrimaryColumn({ name: "company_id" })
  companyId: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;
}
