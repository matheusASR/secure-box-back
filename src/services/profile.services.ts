import { IUpdateUser, IUserReturn } from "../interfaces";
import { userRepository } from "../repositories";
import { userSchemaUpdate } from "../schemas";

const retrieve = async (id: number): Promise<IUpdateUser> => {
  const user: IUserReturn | null =
    await userRepository.findOne({ where: { id } });
  return userSchemaUpdate.parse(user);
};

export default { retrieve };