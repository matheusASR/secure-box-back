import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { User } from "../entities";
import { AppError } from "../errors";
import { userRepository } from "../repositories";

const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const authorization: string | undefined = req.headers.authorization;
  if (!authorization) throw new AppError("Missing bearer token", 401);

  const token: string = authorization.split(" ")[1];

  verify(token, process.env.SECRET_KEY!, async (err, decoded: any) => {
    if (err) throw new AppError(err.message, 401);
    const id = decoded.sub
    const foundUser: User | null = await userRepository.findOneBy({ id });
    if (foundUser?.admin === false) throw new AppError("Somente usuários admin!", 403);
  });

  return next();
};

export { isAdmin };