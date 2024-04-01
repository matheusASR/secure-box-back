import { AppError } from "../errors";
import { walletRepository } from "../repositories";

const update = async (payload: any, userId: any): Promise<any | Error> => {
  const paymentPrice = payload.price;
  const userWallet: any = await walletRepository.findOne({
    where: { user: { id: userId } },
  });

  if (!userWallet) {
    throw new AppError("Carteira não encontrada.");
  }

  if (Number(paymentPrice) > Number(userWallet.balance)) {
    throw new AppError(
      "Fundos insuficientes."
    );
  }

  const walletupdated = await walletRepository.save({
    ...userWallet,
    balance: (Number(userWallet.balance) - Number(paymentPrice)).toFixed(2),
  });

  return walletupdated;
};

export default { update };
