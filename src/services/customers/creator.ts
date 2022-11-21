import { DataSource } from "typeorm";
import { Company, Customer } from "../../models/core";

export class CustomerCreator {
  company: Company;
  email: string;
  password: string;

  constructor({
    company,
    email,
    password,
  }: {
    company: Company;
    email: string;
    password: string;
  }) {
    this.company = company;
    this.email = email;
    this.password = password;
  }

  async create() {
    const customer = Customer.create({
      email: this.email,
      password: this.password,
      company: this.company,
      reload: false,
    });

    await customer.save();

    return customer;
  }
}
