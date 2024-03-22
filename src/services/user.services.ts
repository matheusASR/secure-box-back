import {
  IUpdateUser,
  IUserReturn,
  UserCreate,
  UserRead,
  UserReturn,
} from "../interfaces";
import { User } from "../entities";
import { userRepository } from "../repositories";
import { userReadSchema, userReturnSchema, userSchemaUpdate } from "../schemas";
import { DeepPartial } from "typeorm";

const create = async (payloadUser: any): Promise<UserReturn> => {
  if (payloadUser.address) {
    if (!payloadUser.address.complement) {
      payloadUser.address.complement = "";
    }
  }

  const userCreated: any = userRepository.create(payloadUser);
  await userRepository.save(userCreated);

  return userReturnSchema.parse(userCreated);
};

const read = async (): Promise<UserRead> => {
  const users: IUserReturn[] = await userRepository.find();
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
  return userSchemaUpdate.parse(
    await userRepository.save({ ...foundUser, ...payload })
  );
};

const destroy = async (user: User): Promise<void> => {
  await userRepository.remove(user);
};

export default { create, read, retrieve, update, destroy };
