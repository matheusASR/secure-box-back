import { NextFunction, Request, Response } from "express";
import { PaymentMethod } from "../entities";
import { paymentMethodRepository } from "../repositories";
import { AppError } from "../errors";

export const verifyPaymentMethodExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id: number = Number(req.params.id);

  const foundPaymentMethod: PaymentMethod | null = await paymentMethodRepository.findOneBy({ id });
  if (!foundPaymentMethod) throw new AppError("Método de pagamento não encontrado!", 404);

  res.locals = { ...res.locals, foundPaymentMethod };

  return next();
};