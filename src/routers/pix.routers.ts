import { Router } from "express";
import middlewares from "../middlewares";
import { pixControllers } from "../controllers";

export const pixRouter: Router = Router();

pixRouter.get("/qrcode", pixControllers.generateQRCode);
pixRouter.get("/pix-code", pixControllers.generatePixCode);