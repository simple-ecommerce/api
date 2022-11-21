import { dataSource } from "../../../app-data-source";
import { wait } from "../../../helpers/promise/promiseHelpers";

export const closeDbConnection = async () => {
  await wait(1); //wait for typeorm routines
  await dataSource.destroy();
};
