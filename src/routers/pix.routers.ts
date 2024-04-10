import { Router } from "express";
import middlewares from "../middlewares";
import { pixControllers } from "../controllers";

export const pixRouter: Router = Router();

pixRouter.post("", pixControllers.generatePIX);
pixRouter.post("/webhook(/pix)?", pixControllers.verifyPIX);