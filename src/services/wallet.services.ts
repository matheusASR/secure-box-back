import { AppError } from "../errors";
import { walletRepository } from "../repositories";

const update = async (payload: any, userId: any): Promise<any | Error> => {
  const paymentPrice = payload.price;
  const userWallet: any = await walletRepository.findOne({
    where: { user: { id: userId } },
  });

  if (!userWallet) {
    return new AppError("Carteira não encontrada.");
  }

  if (paymentPrice > userWallet.balance) {
    return new AppError(
      "Você não possui fundos suficientes para a transação. Adicione fundos para continuar."
    );
  }

  const walletupdated = await walletRepository.save({
    ...userWallet,
    balance: userWallet.balance - paymentPrice,
  });

  return walletupdated;
};

export default { update };
