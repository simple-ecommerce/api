import * as yup from "yup";

export interface ValidationSchema {
  body?: yup.ObjectSchema<any> | undefined;
  query?: yup.ObjectSchema<any> | undefined;
  params?: yup.ObjectSchema<any> | undefined;
}
