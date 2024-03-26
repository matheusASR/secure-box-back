import {
  IUpdateUser,
  IUserReturn,
  UserCreate,
  UserRead,
  UserReturn,
} from "../interfaces";
import { Address, User } from "../entities";
import { addressRepository, userRepository } from "../repositories";
import { userReadSchema, userReturnSchema, userSchemaUpdate } from "../schemas";
import { DeepPartial } from "typeorm";

const create = async (payloadUser: UserCreate, payloadAddress: any): Promise<UserReturn> => {
  if (payloadAddress) {
    if (!payloadAddress.complement) {
      payloadAddress.complement = "";
    }
  }

  const userCreated: UserReturn = userRepository.create(payloadUser);
  await userRepository.save(userCreated);

  const userId: number = Number(userCreated.id)
  const addressCreated = addressRepository.create({...payloadAddress, user: userId})
  await addressRepository.save(addressCreated);

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
  payload: DeepPartial<any>
): Promise<IUpdateUser> => {
  const userID: any = Number(foundUser.id)
  const userAddress = await addressRepository.findOne({ where: { user: userID } })

  if (payload.address) {
    await addressRepository.save({...userAddress, ...payload.address})
  }

  return userSchemaUpdate.parse(
    await userRepository.save({ ...foundUser, ...payload })
  );
};

const destroy = async (user: User): Promise<void> => {
  await userRepository.remove(user);
};

export default { create, read, retrieve, update, destroy };
