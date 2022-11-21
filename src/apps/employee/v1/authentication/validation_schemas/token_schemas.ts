import * as yup from "yup";
import { ValidationSchema } from "../../../../../types/interfaces/ValidationSchema";

export const tokenSchemas: {
  [action: string]: ValidationSchema;
} = {
  login: {
    body: yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required(),
      companyId: yup.number().required(),
    }),
  },
  refresh: {
    body: yup.object().shape({
      refreshToken: yup.string().required(),
    }),
  },
  revoke: {
    body: yup.object().shape({
      accessToken: yup.string().required(),
    }),
  },
};
