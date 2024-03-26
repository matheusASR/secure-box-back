import { IUpdateUser, IUserReturn, UserProfile } from "../interfaces";
import { addressRepository, paymentMethodRepository, userRepository } from "../repositories";
import { userProfileSchema, userReturnSchema, userSchemaUpdate } from "../schemas";

const retrieve = async (id: any): Promise<UserProfile> => {
  const user: IUserReturn | null = await userRepository.findOne({ where: { id } });
  const userResponse = userReturnSchema.parse(user)
  const userAddress = await addressRepository.findOne({where: {user: id}})
  const userPaymentMethod = await paymentMethodRepository.findOne({where: {user: id}})
  const response = {
    ...userResponse,
    address: {
      ...userAddress
    },
    paymentMethods: {
      ...userPaymentMethod
    }
  }

  return userProfileSchema.parse(response);
};

export default { retrieve };