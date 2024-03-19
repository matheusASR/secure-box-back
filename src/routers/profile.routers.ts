import { Router } from "express";
import middlewares from "../middlewares";
import { profileControllers } from "../controllers";

export const profileRouter: Router = Router();

profileRouter.get("", middlewares.verifyToken, profileControllers.retrieve);