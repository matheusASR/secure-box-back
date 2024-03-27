import { IUserReturn } from "../interfaces";
import {
  addressRepository,
  paymentMethodRepository,
  userRepository,
} from "../repositories";
import { userReturnSchema } from "../schemas";

const retrieve = async (id: any): Promise<any> => {
  const user: IUserReturn | null = await userRepository.findOne({
    where: { id },
  });
  const userResponse = userReturnSchema.parse(user);
  const userAddress = await addressRepository.findOne({
    where: { user: { id } },
  });
  const userPaymentMethods = await paymentMethodRepository.find({
    where: { user: { id } },
  });

  const response = {
    ...userResponse,
    address: {
      ...userAddress,
    },
    paymentMethods: userPaymentMethods,
  };
  return response;
};

export default { retrieve };
