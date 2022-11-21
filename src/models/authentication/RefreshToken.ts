import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Application } from "../../types/enums/Application";
import { Customer } from "../core/Customer";
import { Employee } from "../core/Employee";

@Entity("refresh_tokens")
export class RefreshToken extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  token: string;

  @Column()
  application: string;

  @Column({ name: "customer_id", nullable: true })
  customerId: number;

  @Column({ name: "employee_id", nullable: true })
  employeeId: number;

  @ManyToOne(() => Customer, (customer) => customer.refreshTokens, {
    nullable: true,
  })
  @JoinColumn({ name: "customer_id" })
  customer?: Customer;

  @ManyToOne(() => Employee, (employee) => employee.refreshTokens, {
    nullable: true,
  })
  @JoinColumn({ name: "employee_id" })
  employee?: Employee;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;
}
