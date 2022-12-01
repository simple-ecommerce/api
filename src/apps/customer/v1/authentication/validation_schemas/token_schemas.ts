import * as yup from "yup";
import { ValidationSchema } from "../../../../../utils/types/interfaces/ValidationSchema";

export const tokenSchemas: {
  [action: string]: ValidationSchema;
} = {
  login: {
    body: yup
      .object()
      .shape({
        email: yup.string().email().required(),
        password: yup.string().required(),
        companyId: yup.string().required(),
      })
      .noUnknown(true),
  },
  refresh: {
    body: yup
      .object()
      .shape({
        refreshToken: yup.string().required(),
      })
      .noUnknown(true),
  },
  revoke: {
    body: yup
      .object()
      .shape({
        accessToken: yup.string().required(),
      })
      .noUnknown(true),
  },
};
