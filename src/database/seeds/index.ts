import { dataSource } from "../../app-data-source";
import { companiesSeed } from "./companies_seed";
import { customersSeed } from "./customers_seed";
import { employeesSeed } from "./employees_seed";
import { employeeCompaniesSeed } from "./employee_companies_seed";
import { itemsSeed } from "./items_seed";
import { itemSpecificationsSeed } from "./item_specifications_seed";
import { specificationsSeed } from "./specifications_seed";
import { specificationCategoriesSeed } from "./specification_categories_seed";

const seed = async () => {
  await dataSource.initialize();
  const companies = await companiesSeed();

  const employees = await employeesSeed({
    companies,
  });
  await employeeCompaniesSeed({ companies, employees });
  await customersSeed({ companies });
  const items = await itemsSeed({ companies });
  const specificationCategories = await specificationCategoriesSeed({
    companies,
  });
  const specifications = await specificationsSeed({ specificationCategories });
  await itemSpecificationsSeed({ items, specifications });
};

seed();
