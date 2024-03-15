import { userServices } from "../services";

const create = async (req, res) => {
  const payloadUser = req.body
  const user = await userServices.create(payloadUser);

  return res.status(201).json(user);
};

const read = async (req, res) => {
  const users = await userServices.read();

  return res.status(200).json(users);
};

const retrieve = async (req, res) => {
  const id = Number(req.params.id);
  const user = await userServices.retrieve(id);

  return res.status(200).json(user);
};

const update = async (req, res) => {
  const payload = req.body;
  const foundUser = res.locals.foundUser;
  const userUpdated = await userServices.update(foundUser, payload);

  return res.status(200).json(userUpdated);
};

const destroy = async (req, res) => {
  await userServices.destroy(res.locals.foundUser);

  return res.status(204).json();
};

export default { create, read, retrieve, update, destroy };