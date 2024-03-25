import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { cpf } from 'cpf-cnpj-validator';

export const validateCpf = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const cpfString: string = req.body.cpf;

  if (!cpf.isValid(cpfString)) {
    throw new AppError('CPF inválido', 400);
  }

  return next();
};