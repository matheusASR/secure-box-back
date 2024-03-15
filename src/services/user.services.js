import { userRepository } from "../repositories";
// criar schemas

const create = async (payload) => {
  const userCreated = userRepository.create(payload);
  await userRepository.save(userCreated);

  return userReturnSchema.parse(userCreated);
};

const read = async () => {
  const users = await userRepository.find();

  return userReadSchema.parse(users);
};

const retrieve = async (id) => {
  const user = await userRepository.findOne({ where: { id } });

  return userReturnSchema.parse(user);
};

const update = async (foundUser, payload) => {
  return userReturnSchema.parse(
    await userRepository.save({ ...foundUser, ...payload })
  );
};

const destroy = async (user) => {
  await userRepository.remove(user);
};

export default { create, read, retrieve, update, destroy };
