import { Router } from "express";
import middlewares from "../middlewares";
import { pixControllers } from "../controllers";

export const pixRouter: Router = Router();

pixRouter.post("/generatepix", pixControllers.generatePIX);
pixRouter.post("/webhook", pixControllers.verifyPIX);
pixRouter.post("/pix", pixControllers.statusPix);
pixRouter.post("/config-webhook", pixControllers.configWebhook);
pixRouter.post("/verifyPix", pixControllers.verifyStatusPix);