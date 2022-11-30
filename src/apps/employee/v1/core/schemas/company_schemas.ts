import * as yup from "yup";
import { ValidationSchema } from "../../../../../utils/types/interfaces/ValidationSchema";

export const companySchemas: {
  [action: string]: ValidationSchema;
} = {
  list: {
    query: yup
      .object()
      .shape({
        page: yup.number().min(1),
        perPage: yup.number().min(1),
      })
      .noUnknown(true),
  },
};
