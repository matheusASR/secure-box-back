import { Router } from "express";
import middlewares from "../middlewares";
import { allocationCreateSchema } from "../schemas";
import { allocationControllers } from "../controllers";

export const allocationRouter: Router = Router();

allocationRouter.post(
  "/:cageId",
  middlewares.verifyToken,
  allocationControllers.create
);
allocationRouter.get("", allocationControllers.read);
allocationRouter.get("/:id", middlewares.verifyAllocationIdExists, allocationControllers.retrieve);
allocationRouter.get("/:userId/userNotFinished", allocationControllers.userNotFinishedAllocations);
allocationRouter.get("/:userId/userFinished", allocationControllers.userFinishedAllocations);
allocationRouter.patch("/:id", middlewares.verifyAllocationIdExists, allocationControllers.update);
allocationRouter.delete("/:id", middlewares.verifyAllocationIdExists, middlewares.isAdmin, allocationControllers.destroy);