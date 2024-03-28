import { Request, Response } from "express";
import { paymentMethodServices } from "../services";
import { IPaymentMethod, PaymentMethodCreate, PaymentMethodUpdate } from "../interfaces";
import { paymentMethodRepository } from "../repositories";

const create = async (req: Request, res: Response): Promise<Response> => {
  const userId = Number(req.params.userId);
  const payload = req.body;

  const userPaymentMethods = await paymentMethodRepository.find({ where: { user: { id: userId } }});

  if (!userPaymentMethods || userPaymentMethods.length === 0) {
    payload.isDefault = true;
  } else {
    payload.isDefault = false; 
  }

  const paymentMethod: IPaymentMethod = await paymentMethodServices.create(payload, userId);
  return res.status(201).json(paymentMethod);
};

const update = async (req: Request, res: Response): Promise<Response> => {
  const userId = Number(req.params.userId)
  const id = Number(req.params.id)
  const payload: PaymentMethodUpdate = req.body;
  const foundPaymentMethod = await paymentMethodRepository.findOne({ where: { id }})

  const paymentMethodUpdated = await paymentMethodServices.update(foundPaymentMethod, payload, userId);

  return res.status(200).json(paymentMethodUpdated);
};


const destroy = async (req: Request, res: Response): Promise<Response> => {
  const id = Number(req.params.id);
  const paymentMethod: any = await paymentMethodRepository.findOne({ where: { id }});
  await paymentMethodServices.destroy(paymentMethod);
  return res.status(204).json();
};

export default { create, update, destroy };
