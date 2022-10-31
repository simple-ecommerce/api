import { NextFunction, Request, Response } from "express";
import { ValidationSchema } from "../types/ValidationSchema";

export const validateSchemaMiddleware = (
  validationSchema: ValidationSchema
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    console.log(req.query);
    console.log(req.params);

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
