import { Request, Response } from "express";
import { IPayment, PaymentCreate } from "../interfaces";
import { paymentServices } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const payload: PaymentCreate = req.body;
  const userId = req.params.id;
  const paymentPayload: any = await paymentServices.create({
    ...payload,
    user: userId,
  });
  return res.status(200).json(paymentPayload);
};

const retrieveUserPayments = async (req: Request, res: Response): Promise<Response> => {
  const userId = Number(req.params.id);
  const userPayments: any = await paymentServices.retrieveUserPayments(userId);
  return res.status(200).json(userPayments);
};

export default { create, retrieveUserPayments };
