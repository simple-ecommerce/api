import { NextFunction, Request, Response } from "express";
import { ValidationSchema } from "../utils/types/interfaces/ValidationSchema";

export const validateSchemaMiddleware = (
  validationSchema: ValidationSchema
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (validationSchema.body) {
        req.body = await validationSchema.body.validate(req.body);
      }
      if (validationSchema.query) {
        req.query = await validationSchema.query.validate(req.query);
      }
      if (validationSchema.params) {
        req.params = await validationSchema.params.validate(req.params);
      }
      next();
    } catch (err) {
      res.status(400).send(err);
    }
  };
};
