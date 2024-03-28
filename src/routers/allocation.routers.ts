import { Router } from "express";
import middlewares from "../middlewares";
import { allocationControllers } from "../controllers";

export const allocationRouter: Router = Router();

allocationRouter.post(
  "/:cageId",
 middlewares.verifyToken,
  allocationControllers.create
);
allocationRouter.get("", allocationControllers.read);
allocationRouter.get(
  "/:id",
  // middlewares.verifyAllocationIdExists,
  allocationControllers.retrieve
);
allocationRouter.get(
  "/:userId/inuse",
  allocationControllers.userInUseAllocations
);
allocationRouter.get(
  "/:userId/finished",
  allocationControllers.userFinishedAllocations
);
allocationRouter.patch(
  "/:id",
  // middlewares.verifyAllocationIdExists,
  allocationControllers.update
);
allocationRouter.delete(
  "/:id",
  // middlewares.verifyAllocationIdExists,
  // middlewares.isAdmin,
  allocationControllers.destroy
);
