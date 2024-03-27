import {
  AddressCreate,
  IUpdateUser,
  IUserReturn,
  UserRead,
  UserReturn,
  UserWid,
} from "../interfaces";
import { User } from "../entities";
import { addressRepository, userRepository } from "../repositories";
import { userReadSchema, userReturnSchema, userSchemaUpdate } from "../schemas";
import { DeepPartial } from "typeorm";
import walletRepository from "../repositories/wallet.repository";

const create = async (
  payloadUser: UserWid,
  payloadAddress: AddressCreate
): Promise<UserReturn> => {
  const userCreated: UserReturn = userRepository.create(payloadUser);
  await userRepository.save(userCreated);

  const userId: any = Number(userCreated.id);

  const addressCreated = addressRepository.create({
    ...payloadAddress,
    user: userId
  });
  await addressRepository.save(addressCreated);

  const walletCreated = walletRepository.create({
    balance: parseFloat("0"),
    user: userId
  })
  await walletRepository.save(walletCreated);

  return userReturnSchema.parse(userCreated);
};

const read = async (): Promise<UserRead> => {
  const users: UserReturn[] = await userRepository.find();
  return userReadSchema.parse(users);
};

const retrieve = async (id: number): Promise<IUpdateUser> => {
  const user: IUserReturn | null = await userRepository.findOne({
    where: { id },
  });
  return userSchemaUpdate.parse(user);
};

const update = async (
  foundUser: IUserReturn,
  payload: DeepPartial<IUpdateUser>
): Promise<any> => {
  const userID: any = Number(foundUser.id);
  const userAddress = await addressRepository.findOne({
    where: { user: {id: userID} }
  });

  if (payload.address) {
    await addressRepository.save({ ...userAddress, ...payload.address });
  }

  await userRepository.save({ ...foundUser, ...payload })

  return {
    ...foundUser,
    address: {...userAddress}
  }
};

const destroy = async (user: User): Promise<void> => {
  await userRepository.remove(user);
};

export default { create, read, retrieve, update, destroy };
