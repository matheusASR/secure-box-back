import { Router } from "express";
import middlewares from "../middlewares";
import { allocationCreateSchema } from "../schemas";
import { allocationControllers } from "../controllers";

export const allocationRouter: Router = Router();

allocationRouter.use("/:id", middlewares.verifyAllocationIdExists);

allocationRouter.post(
  "/:cageId",
  middlewares.validateBody(allocationCreateSchema),
  middlewares.verifyToken,
  allocationControllers.create
);
allocationRouter.get("", allocationControllers.read);
allocationRouter.get("/:id", allocationControllers.retrieve);
allocationRouter.get("/:userId/userNotFinished", allocationControllers.userNotFinishedAllocations);
allocationRouter.get("/:userId/userFinished", allocationControllers.userFinishedAllocations);
allocationRouter.patch("/:id", allocationControllers.update);