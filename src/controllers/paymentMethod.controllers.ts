import { Request, Response } from "express";
import { paymentMethodServices } from "../services";
import { IPaymentMethod, PaymentMethodCreate } from "../interfaces";
import { paymentMethodRepository } from "../repositories";

const create = async (req: Request, res: Response): Promise<Response> => {
  const payload: PaymentMethodCreate = req.body;
  const paymentMethod: IPaymentMethod = await paymentMethodServices.create(
    payload
  );
  return res.status(201).json(paymentMethod);
};

const destroy = async (req: Request, res: Response): Promise<Response> => {
  const userId = res.locals.userID;
  const paymentMethod: any = paymentMethodRepository.findOne({
    where: { user: userId },
  });
  await paymentMethodServices.destroy(paymentMethod);
  return res.status(204).json();
};

export default { create, destroy };
