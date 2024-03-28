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
  payload: PaymentMethodUpdate,
  userId: any
): Promise<any> => {
  const paymentMethodID = foundPaymentMethod.id
  await paymentMethodRepository.save({ ...foundPaymentMethod, ...payload })

  const userPaymentMethods = await paymentMethodRepository.find({where: {user: {id: userId}}})
  userPaymentMethods.forEach( async (userPaymentMethod: any) => {
    if (userPaymentMethod.id !== paymentMethodID) {
      await paymentMethodRepository.save({...PaymentMethod, isDefault: false})
    }
  });

  return foundPaymentMethod
};

const destroy = async (paymentMethod: PaymentMethod): Promise<void> => {
  await paymentMethodRepository.remove(paymentMethod);
};

export default { create, update, destroy };
