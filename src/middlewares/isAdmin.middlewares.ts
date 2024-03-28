import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { User } from "../entities";
import { AppError } from "../errors";
import { userRepository } from "../repositories";

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) throw new AppError("Missing bearer token", 401);

    const token = authorization.split(" ")[1];

    const decoded = verify(token, process.env.SECRET_KEY!);
    const id: any = decoded.sub;

    const foundUser = await userRepository.findOneBy({ id });
    if (!foundUser || foundUser.admin === false) {
      throw new AppError("Somente usuários admin!", 403);
    }

    return next();
  } catch (error: any) {
    if (error instanceof AppError) {
      res.status(403).json({ message: error.message });
    } else {
      console.error(error); // Log unexpected errors for debugging
      res.status(500).json({ message: "Erro interno do servidor" }); // Generic error for client
    }
  }
};

export { isAdmin };
