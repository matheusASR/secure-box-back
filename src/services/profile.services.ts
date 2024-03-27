import { IUpdateUser, IUserReturn, UserProfile } from "../interfaces";
import { addressRepository, paymentMethodRepository, userRepository } from "../repositories";
import { userAddressSchema, userProfileSchema, userReturnSchema, userSchemaUpdate } from "../schemas";

const retrieve = async (id: any): Promise<any> => {
  const user: IUserReturn | null = await userRepository.findOne({ where: { id } });
  const userResponse = userReturnSchema.parse(user)
  const userAddress = await addressRepository.findOne({ where: {user: {id}}})
  const userPaymentMethods = await paymentMethodRepository.find({ where: {user: {id}}})
  if (userPaymentMethods) {
    const responsePM = {
      ...userResponse,
      address: {
        ...userAddress
      },
      paymentMethods: userPaymentMethods
    }
    return responsePM;
  } else {
    const responseWPM = {
      ...userResponse,
      address: {
        ...userAddress
      }
    }

    return responseWPM;
  }
};

export default { retrieve };