import { IPaymentMethod, PaymentMethodCreate, PaymentMethodUpdate } from "../interfaces";
import { PaymentMethod } from "../entities";
import { paymentMethodRepository, userRepository } from "../repositories";
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
  payload: PaymentMethodUpdate,
  userId: any
): Promise<any> => {
  const paymentMethodID = foundPaymentMethod.id;
  const paymentMethodUpdated = await paymentMethodRepository.save({ ...foundPaymentMethod, ...payload });
  const userPaymentMethods = await paymentMethodRepository.find({ where: { user: { id: userId } }, relations: ["user"] });

  for (const userPaymentMethod of userPaymentMethods) {
    if (userPaymentMethod.id !== paymentMethodID) {
      await paymentMethodRepository.save({ ...userPaymentMethod, isDefault: false });
    }
  }

  return paymentMethodUpdated;
};

const destroy = async (paymentMethod: PaymentMethod, userId: any): Promise<void> => {
  const userPaymentMethods = await paymentMethodRepository.find({ where: { user: { id: userId } }, relations: ["user"] });
  for (const userPaymentMethod of userPaymentMethods) {
    if (userPaymentMethod.id !== paymentMethod.id) {
      await paymentMethodRepository.save({ ...userPaymentMethod, isDefault: true });
    }
  }
  await paymentMethodRepository.remove(paymentMethod);
};

export default { create, update, destroy };
