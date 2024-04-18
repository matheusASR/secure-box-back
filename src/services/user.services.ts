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
import nodemailer from 'nodemailer';
import "dotenv/config";

const create = async (
  payloadUser: UserWid,
  payloadAddress: AddressCreate
): Promise<UserReturn> => {
  const userCreated: UserReturn = userRepository.create(payloadUser);
  await userRepository.save(userCreated);

  const addressCreated = addressRepository.create({
    ...payloadAddress,
    user: userCreated
  });
  await addressRepository.save(addressCreated);

  const walletCreated = walletRepository.create({
    balance: Number(0),
    user: userCreated
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

  const userUpdated = await userRepository.save({ ...foundUser, ...payload })

  if (payload.address) {
    const addressUpdated = await addressRepository.save({ ...userAddress, ...payload.address });
    return {
      ...userUpdated,
      address: {...addressUpdated}
    }
  }

  return {
    ...userUpdated
  }
};

const destroy = async (user: User): Promise<void> => {
  await userRepository.remove(user);
};

const sendCode = async (payload: any): Promise<void> => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: "appsecbox@gmail.com",
      pass: process.env.APP_PASSWORD
    }
  });

  const mailOptions: nodemailer.SendMailOptions = {
    from: 'appsecbox@gmail.com',
    to: payload.email,
    subject: 'Código de Verificação',
    text: `Seu código de verificação é: ${payload.code}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Erro ao enviar e-mail:', error);
    }
  });
};

export default { create, read, retrieve, update, destroy, sendCode };
