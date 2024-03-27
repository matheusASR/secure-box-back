import { Router } from "express";
import middlewares from "../middlewares";
import { paymentCreateSchema } from "../schemas";
import { paymentControllers } from "../controllers";

export const paymentRouter: Router = Router();

paymentRouter.post(
  "/:userId",
  middlewares.verifyIdExists,
//   middlewares.validateBody(paymentCreateSchema),
  middlewares.verifyToken,
  paymentControllers.create
);

paymentRouter.get(
  "/:userId",
  middlewares.verifyIdExists,
//   middlewares.validateBody(paymentCreateSchema),
  middlewares.verifyToken,
  paymentControllers.retrieveUserPayments
);
