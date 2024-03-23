import { NextFunction, Request, Response } from "express";
import { User } from "../entities";
import { userRepository } from "../repositories";
import { AppError } from "../errors";

export const verifyIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id: number = Number(req.params.id);

  const foundUser: User | null = await userRepository.findOneBy({ id });
  if (!foundUser) throw new AppError("Usuário não encontrado!", 404);

  res.locals = { ...res.locals, foundUser };

  return next();
};