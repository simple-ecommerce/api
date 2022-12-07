import * as yup from "yup";
import { ValidationSchema } from "../../../../../utils/types/interfaces/ValidationSchema";

export const itemSchemas: {
  specifications: Record<"list" | "create", ValidationSchema>;
} & Record<"create" | "update" | "list" | "show" | "remove", ValidationSchema> =
  {
    create: {
      body: yup
        .object()
        .shape({
          name: yup.string().required(),
          shortDescription: yup.string().required(),
          longDescription: yup.string().required(),
          price: yup.number().required(),
          sku: yup.string().optional(),
          ean: yup.string().optional(),
          upc: yup.string().optional(),
          gtin: yup.string().optional(),
          brand: yup.string().optional(),
          companyId: yup.number().required(),
        })
        .noUnknown(true),
    },
    update: {
      body: yup
        .object()
        .shape({
          name: yup.string().optional(),
          shortDescription: yup.string().optional(),
          longDescription: yup.string().optional(),
          price: yup.number().optional(),
          sku: yup.string().optional(),
          ean: yup.string().optional(),
          upc: yup.string().optional(),
          gtin: yup.string().optional(),
          brand: yup.string().optional(),
          companyId: yup.number().required(),
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
          companyId: yup.number().required(),
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
      query: yup
        .object()
        .shape({
          companyId: yup.number().required(),
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
      query: yup
        .object()
        .shape({
          companyId: yup.number().required(),
        })
        .noUnknown(true),
    },
    specifications: {
      list: {
        params: yup
          .object()
          .shape({
            itemId: yup.number().required(),
          })
          .noUnknown(true),
        query: yup
          .object()
          .shape({
            page: yup.number().min(1),
            perPage: yup.number().min(1),
            companyId: yup.number().required(),
          })
          .noUnknown(true),
      },
      create: {
        params: yup
          .object()
          .shape({
            itemId: yup.number().required(),
          })
          .noUnknown(true),
        body: yup
          .object()
          .shape({
            specificationId: yup.number().required(),
            priceExtra: yup.number().required(),
            companyId: yup.number().required(),
          })
          .noUnknown(true),
      },
    },
  };
