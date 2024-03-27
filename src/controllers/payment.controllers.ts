import { Request, Response } from "express";
import { IPayment, PaymentCreate } from "../interfaces";
import { paymentServices } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const payload: PaymentCreate = req.body;
  const userId = Number(req.params.userId);
  const paymentPayload: any = await paymentServices.create({
    ...payload,
    user: userId,
  });
  return res.status(200).json(paymentPayload);
};

export default { create };
