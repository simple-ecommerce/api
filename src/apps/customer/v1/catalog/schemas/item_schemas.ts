import { ValidationSchema } from "../../../../../utils/types/interfaces/ValidationSchema";
import * as yup from "yup";

export const itemSchemas: { [key: string]: ValidationSchema } = {
  list: {
    query: yup
      .object()
      .shape({
        companyId: yup.number().required(),
        page: yup.number().required(),
        perPage: yup.number().required(),
      })
      .noUnknown(true),
  },
};
