import { paymentRepository, walletRepository } from "../repositories";
import { paymentSchema } from "../schemas";

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

export default { create };
