import { NextFunction, Request, Response } from "express";
import { Cage } from "../entities";
import { cageRepository } from "../repositories";
import { AppError } from "../errors";

export const verifyCageIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id: number = Number(req.params.id);

  const foundCage: Cage | null = await cageRepository.findOneBy({ id });
  if (!foundCage) throw new AppError("Gaiola não encontrada!", 404);

  res.locals = { ...res.locals, foundCage };

  return next();
};