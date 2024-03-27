import { Request, Response } from "express";
import { userServices } from "../services";
import { AddressCreate, IUpdateUser, IUserReturn, UserCreate, UserRead, UserReturn, UserWid } from "../interfaces";
import { DeepPartial } from "typeorm";

const create = async (req: Request, res: Response): Promise<Response> => {
  const payload = req.body;
  const payloadAddress: AddressCreate = payload.address
  const payloadUser: UserWid = {
    name: payload.name,
    email: payload.email,
    cpf: payload.cpf,
    birthdate: payload.birthdate,
    cel: payload.cel,
    password: payload.password,
    admin: false
  }
  const user: UserReturn = await userServices.create(payloadUser, payloadAddress); 
  return res.status(201).json(user);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const users: UserRead = await userServices.read();
  return res.status(200).json(users);
};

const retrieve = async (req: Request, res: Response): Promise<Response> => {
  const id: number = Number(req.params.id);
  const user: IUpdateUser = await userServices.retrieve(id);
  return res.status(200).json(user);
};

const update = async (req: Request, res: Response): Promise<Response> => {
  const payload: DeepPartial<IUpdateUser> = req.body;
  const foundUser: IUserReturn = res.locals.foundUser;

  const userUpdated = await userServices.update(foundUser, payload);

  return res.status(200).json(userUpdated);
};

const destroy = async (req: Request, res: Response): Promise<Response> => {
  await userServices.destroy(res.locals.foundUser);
  return res.status(204).json();
};

export default { create, read, retrieve, update, destroy };