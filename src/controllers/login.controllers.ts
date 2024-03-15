import { Request, Response } from "express";
import { LoginReturn } from "../interfaces";
import { loginServices } from "../services";

const login = async (req: Request, res: Response): Promise<Response> => {
  const token: LoginReturn = await loginServices.login(req.body);
  return res.status(200).json(token);
};

export default { login };