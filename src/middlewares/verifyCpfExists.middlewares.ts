import { NextFunction, Request, Response } from "express";
import { User } from "../entities";
import { userRepository } from "../repositories";
import { AppError } from "../errors";

export const verifyCpfExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const cpf: string = req.body.cpf;

  const foundUser: User | null = await userRepository.findOneBy({ cpf });
  if (foundUser) throw new AppError("Cpf already registered", 409);

  return next();
};