import { Router } from "express";
import middlewares from "../middlewares";
import { paymentControllers } from "../controllers";

export const paymentRouter: Router = Router();

paymentRouter.post(
  "/:id",
  middlewares.verifyIdExists,
  middlewares.verifyToken,
  paymentControllers.create
);

paymentRouter.get(
  "/:id",
  middlewares.verifyIdExists,
  middlewares.verifyToken,
  paymentControllers.retrieveUserPayments
);
