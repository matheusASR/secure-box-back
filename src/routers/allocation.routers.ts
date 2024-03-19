import { Router } from "express";
import middlewares from "../middlewares";
import { allocationCreateSchema } from "../schemas";
import { allocationControllers } from "../controllers";

export const allocationRouter: Router = Router();

allocationRouter.use("/:id", middlewares.verifyIdExists);

allocationRouter.post(
  "",
  middlewares.validateBody(allocationCreateSchema),
  allocationControllers.create
);
allocationRouter.get("", allocationControllers.read);
allocationRouter.get("/:id", allocationControllers.retrieve);
allocationRouter.get("/:userId", allocationControllers.retrieveUserAllocations);
allocationRouter.patch("/:id", allocationControllers.update);