import { Router } from "express";
import middlewares from "../middlewares";
import { cageControllers } from "../controllers";

export const cageRouter: Router = Router();

cageRouter.use("/:id", middlewares.verifyCageIdExists);

cageRouter.post("", middlewares.isAdmin, cageControllers.create);

cageRouter.get("", middlewares.verifyToken, cageControllers.read);

cageRouter.get("/:id", middlewares.verifyToken, cageControllers.retrieve);

cageRouter.patch("/:id", middlewares.verifyToken, cageControllers.update);

cageRouter.delete("/:id", middlewares.isAdmin, cageControllers.destroy);
