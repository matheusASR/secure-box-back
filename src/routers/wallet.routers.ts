import { Router } from "express";
import middlewares from "../middlewares";
import { walletControllers } from "../controllers";

export const walletRouter: Router = Router();

walletRouter.patch(
  "/:userId",
  //middlewares
  walletControllers.update
);
