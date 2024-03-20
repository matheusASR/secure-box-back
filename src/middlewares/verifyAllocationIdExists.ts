import { NextFunction, Request, Response } from "express";
import { Allocation } from "../entities";
import { allocationRepository } from "../repositories";
import { AppError } from "../errors";

export const verifyAllocationIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id: number = Number(req.params.id);

  const foundAllocation: Allocation | null = await allocationRepository.findOneBy({ id });
  if (!foundAllocation) throw new AppError("Allocation not found", 404);

  res.locals = { ...res.locals, foundAllocation };

  return next();
};