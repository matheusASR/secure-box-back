import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

export const isAccountOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id: number = Number(req.params.id);

  if (Number(res.locals.userID) !== id) {
    throw new AppError(
      "Você não tem permissão para deletar ou atualizar este usuário!",
      401
    );
  }

  return next();
};
