import { paymentRepository, walletRepository } from "../repositories";
import { paymentSchema } from "../schemas";
import { paymentReadSchema } from "../schemas/payments.schemas";

const create = async (payload: any): Promise<any> => {
  const paymentPrice = payload.price;
  const userWallet: any = await walletRepository.findOne({
    where: { user: { id: payload.user } },
  });
  await walletRepository.save({
    ...userWallet,
    balance: userWallet.balance + paymentPrice,
  });

  const paymentCreated: any = paymentRepository.create(payload);
  await paymentRepository.save(paymentCreated);

  return paymentSchema.parse(paymentCreated);
};

const retrieveUserPayments = async (userId: any): Promise<any> => {
  const userPayments = await paymentRepository.find({where: {user: {id: userId}}})
  return paymentReadSchema.parse(userPayments);
};

export default { create, retrieveUserPayments };
