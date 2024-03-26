import { IPaymentMethod, PaymentMethodCreate } from "../interfaces";
import { PaymentMethod } from "../entities";
import { paymentMethodRepository } from "../repositories";
import { paymentMethodSchema } from "../schemas";

const create = async (
  payloadPaymentMethod: PaymentMethodCreate
): Promise<IPaymentMethod> => {
  const paymentMethodCreated: IPaymentMethod =
    paymentMethodRepository.create(payloadPaymentMethod);
  await paymentMethodRepository.save(paymentMethodCreated);
  return paymentMethodSchema.parse(paymentMethodCreated);
};

const destroy = async (paymentMethod: PaymentMethod): Promise<void> => {
  await paymentMethodRepository.remove(paymentMethod);
};

export default { create, destroy };
