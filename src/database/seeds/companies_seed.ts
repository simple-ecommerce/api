import { Company } from "../../models/core/Company";
import { companyFactory } from "../factories/company_factory";

export const companiesSeed = async () => {
  const dunderMifflin = await companyFactory({
    name: "Dunder Mifflin",
  });

  const arasaka = await companyFactory({
    name: "Arasaka",
  });

  return { dunderMifflin, arasaka };
};
