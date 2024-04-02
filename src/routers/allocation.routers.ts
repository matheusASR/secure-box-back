import { Router } from "express";
import middlewares from "../middlewares";
import { allocationControllers } from "../controllers";

export const allocationRouter: Router = Router();

allocationRouter.post(
  "/:cageId",
 middlewares.verifyToken,
 allocationControllers.create
);

allocationRouter.get("", middlewares.isAdmin, allocationControllers.read);

allocationRouter.get(
  "/:id",
  middlewares.verifyAllocationIdExists,
  middlewares.isAdmin,
  allocationControllers.retrieve
);

allocationRouter.get(
  "/:userId/inuse",
  middlewares.verifyToken,
  allocationControllers.userInUseAllocations
);

allocationRouter.get(
  "/:userId/finished",
  middlewares.verifyToken,
  allocationControllers.userFinishedAllocations
);

allocationRouter.patch(
  "/:id",
  middlewares.verifyAllocationIdExists,
  middlewares.verifyToken,
  allocationControllers.update
);

allocationRouter.delete(
  "/:id",
  middlewares.verifyAllocationIdExists,
  middlewares.isAdmin,
  allocationControllers.destroy
);
