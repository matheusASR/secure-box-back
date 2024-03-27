import { IUserReturn } from "../interfaces";
import { addressRepository, paymentMethodRepository, userRepository } from "../repositories";
import walletRepository from "../repositories/wallet.repository";
import { userReturnSchema } from "../schemas";

const retrieve = async (id: any): Promise<any> => {
  const user: IUserReturn | null = await userRepository.findOne({ where: { id } });
  const userResponse = userReturnSchema.parse(user)
  const userAddress = await addressRepository.findOne({ where: {user: {id}}})
  const userPaymentMethods = await paymentMethodRepository.find({ where: {user: {id}}})
  const userWallet = await walletRepository.findOne({ where: {user: {id}}})
  if (userPaymentMethods) {
    const responsePM = {
      ...userResponse,
      address: {
        ...userAddress
      },
      paymentMethods: userPaymentMethods,
      wallet: {
        ...userWallet
      }
    }
    return responsePM;
  } else {
    const responseWPM = {
      ...userResponse,
      address: {
        ...userAddress
      },
      wallet: {
        ...userWallet
      }
    }

    return responseWPM;
  }
};

export default { retrieve };