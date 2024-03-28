import { Router } from "express";
import middlewares from "../middlewares";
import { cageCreateSchema } from "../schemas";
import { cageControllers } from "../controllers";

export const cageRouter: Router = Router();

cageRouter.use("/:id", middlewares.verifyCageIdExists);

cageRouter.post(
  "",
  middlewares.validateBody(cageCreateSchema),
  middlewares.isAdmin,
  cageControllers.create
);
cageRouter.get("", cageControllers.read);
cageRouter.get("/:id", cageControllers.retrieve);
cageRouter.patch("/:id", middlewares.verifyToken, cageControllers.update);
cageRouter.delete("/:id", middlewares.isAdmin, cageControllers.destroy);
