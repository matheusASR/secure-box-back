import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors";

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const authorization: string | undefined = req.headers.authorization;
  if (!authorization) throw new AppError("Missing bearer token", 401);

  const token: string = authorization.split(" ")[1];

  verify(token, process.env.SECRET_KEY!, (err, decoded: any) => {
    if (err) throw new AppError(err.message, 401);
    res.locals.userID = decoded.sub;
  });

  return next();
};

export { verifyToken };