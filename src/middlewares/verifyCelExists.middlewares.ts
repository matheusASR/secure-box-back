import { NextFunction, Request, Response } from "express";
import { User } from "../entities";
import { userRepository } from "../repositories";
import { AppError } from "../errors";

export const verifyCelExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const cel: string = req.body.cel;

  const foundUser: User | null = await userRepository.findOneBy({ cel });
  if (foundUser) throw new AppError("Celular já registrado!", 409);

  return next();
};
