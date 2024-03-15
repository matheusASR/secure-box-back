import { IUpdateUser, IUserReturn, UserCreate, UserRead, UserReturn } from "../interfaces";
import { User } from "../entities";
import { userRepository } from "../repositories";
import { userReadSchema, userReturnSchema, userSchemaUpdate } from "../schemas";
import { DeepPartial } from "typeorm";

const create = async (
  payloadUser: UserCreate
): Promise<UserReturn> => {
  const userCreated: IUserReturn = userRepository.create(payloadUser);
  await userRepository.save(userCreated);

  return userReturnSchema.parse(userCreated);
};

const read = async (): Promise<UserRead> => {
  const users: IUserReturn[] = await userRepository.find();
  return userReadSchema.parse(users);
};

const retrieve = async (id: number): Promise<IUpdateUser> => {
  const user: IUserReturn | null = await userRepository.findOne({ where: { id } });
  return userSchemaUpdate.parse(user);
};

const update = async (
  foundUser: IUserReturn,
  payload: DeepPartial<IUpdateUser>
): Promise<IUpdateUser> => {
  return userSchemaUpdate.parse(
    await userRepository.save({ ...foundUser, ...payload })
  );
};

const destroy = async (user: User): Promise<void> => {
  await userRepository.remove(user);
};

export default { create, read, retrieve, update, destroy };
