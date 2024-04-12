import { Router } from "express";
import { loginControllers } from "../controllers";

export const loginRouter: Router = Router();

loginRouter.post("", loginControllers.login);
loginRouter.post("/code", loginControllers.loginCode);