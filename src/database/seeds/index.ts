import { dataSource } from "../../app-data-source";
import { companiesSeed } from "./companies_seed";
import { customersSeed } from "./customers_seed";
import { employeesSeed } from "./employees_seed";

const seed = async () => {
  await dataSource.initialize();
  const companies = await companiesSeed();

  await employeesSeed({
    companies,
  });

  await customersSeed({ companies });
};

seed();