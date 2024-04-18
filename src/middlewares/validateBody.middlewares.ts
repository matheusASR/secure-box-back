import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

export const validateBody =
  (schema: ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction): any => {
    if ('admin' in req.body) {
      return res.status(400).json({ message: "O campo 'admin' não é permitido" });
    }
    req.body = schema.parse(req.body);
    return next();
  };

