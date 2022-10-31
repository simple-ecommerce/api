import { Customer } from "../../models/core/Customer";
import { customerFactory } from "../factories/customer_factory";
import { companiesSeed } from "./companies_seed";

export const customersSeed = async ({
  companies,
}: {
  companies: Awaited<ReturnType<typeof companiesSeed>>;
}) => {
  const jan = await customerFactory({
    email: "jan@email.com",
    password: "10203040",
    company: companies.dunderMifflin,
  });

  const v = await customerFactory({
    email: "v@email.com",
    password: "10203040",
    company: companies.arasaka,
  });

  return { jan, v };
};
