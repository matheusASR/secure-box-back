import { AppError } from "../errors";
import { IUserReturn } from "../interfaces";
import { addressRepository, paymentMethodRepository, userRepository } from "../repositories";
import walletRepository from "../repositories/wallet.repository";
import { userReturnSchema } from "../schemas";

const retrieve = async (id: any): Promise<any> => {
  const user: IUserReturn | null = await userRepository.findOne({ where: { id } , relations: ["paymentMethods", "wallet", "address"]});

  return user;
};

export default {retrieve}
