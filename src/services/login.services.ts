import { compare } from "bcryptjs";
import { User } from "../entities";
import { AppError } from "../errors";
import { userRepository } from "../repositories";
import { sign } from "jsonwebtoken";
import { Login, LoginReturn } from "../interfaces";

const login = async ({
  email,
  password,
}: Login): Promise<LoginReturn> => {
  const foundUser: User | null = await userRepository.findOneBy({ email });
  if (!foundUser) throw new AppError("Email inválido!", 401);

  const samePwd: boolean = await compare(password, foundUser.password);
  if (!samePwd) throw new AppError("Senha inválida!", 401);

  const token: string = sign(
    { admin: foundUser.admin },
    process.env.SECRET_KEY!,
    { subject: foundUser.id.toString(), expiresIn: process.env.EXPIRES_IN! }
  );

  return { token };
};

const loginCode = async (email: any): Promise<LoginReturn> => {
  const foundUser: User | null = await userRepository.findOneBy({ email });
  if (!foundUser) throw new AppError("Email inválido!", 401);

  const token: string = sign(
    { admin: foundUser.admin },
    process.env.SECRET_KEY!,
    { subject: foundUser.id.toString(), expiresIn: process.env.EXPIRES_IN! }
  );

  return { token };
};

export default { login, loginCode };