import { IPaymentMethod, PaymentMethodCreate, PaymentMethodUpdate } from "../interfaces";
import { PaymentMethod } from "../entities";
import { paymentMethodRepository } from "../repositories";
import { paymentMethodSchema } from "../schemas";

const create = async (
  payloadPaymentMethod: any,
  userId: number
): Promise<IPaymentMethod> => {
  const paymentMethodCreated =
    paymentMethodRepository.create({...payloadPaymentMethod, user: userId});
  await paymentMethodRepository.save(paymentMethodCreated);
  return paymentMethodSchema.parse(paymentMethodCreated);
};

const update = async (
  foundPaymentMethod: any,
  payload: PaymentMethodUpdate
): Promise<any> => {
  await paymentMethodRepository.save({ ...foundPaymentMethod, ...payload })

  return foundPaymentMethod
};

const destroy = async (paymentMethod: PaymentMethod): Promise<void> => {
  await paymentMethodRepository.remove(paymentMethod);
};

export default { create, update, destroy };
