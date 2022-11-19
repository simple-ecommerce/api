import { NextFunction, Request, Response } from "express";
import { ValidationSchema } from "../types/interfaces/ValidationSchema";

export const validateSchemaMiddleware = (
  validationSchema: ValidationSchema
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (validationSchema.body) {
        await validationSchema.body.validate(req.body);
      }
      if (validationSchema.query) {
        await validationSchema.query.validate(req.query);
      }
      if (validationSchema.params) {
        await validationSchema.params.validate(req.params);
      }
      next();
    } catch (err) {
      res.status(400).send(err);
    }
  };
};
