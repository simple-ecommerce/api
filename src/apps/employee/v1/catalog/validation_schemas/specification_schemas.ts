import { ValidationSchema } from "../../../../../types/interfaces/ValidationSchema";
import * as yup from "yup";

export const specificationSchemas: {
  [action: string]: ValidationSchema;
} = {
  create: {
    body: yup
      .object()
      .shape({
        name: yup.string().required(),
        description: yup.string().required(),
        internalName: yup.string().required(),
      })
      .noUnknown(true),
  },
  update: {
    body: yup
      .object()
      .shape({
        name: yup.string().optional(),
        description: yup.string().optional(),
        internalName: yup.string().optional(),
      })
      .noUnknown(true),
    params: yup
      .object()
      .shape({
        id: yup.number().required(),
      })
      .noUnknown(true),
  },
  list: {
    query: yup
      .object()
      .shape({
        page: yup.number().min(1),
        perPage: yup.number().min(1),
      })
      .noUnknown(true),
  },
  show: {
    params: yup
      .object()
      .shape({
        id: yup.number().required(),
      })
      .noUnknown(true),
  },
  remove: {
    params: yup
      .object()
      .shape({
        id: yup.number().required(),
      })
      .noUnknown(true),
  },
};
