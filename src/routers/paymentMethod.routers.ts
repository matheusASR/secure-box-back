import { Router } from "express";
import middlewares from "../middlewares";
import { paymentMethodCreateSchema } from "../schemas";
import { paymentMethodControllers } from "../controllers";

export const paymentMethodRouter: Router = Router();

paymentMethodRouter.post(
  "/:userId",
  // middlewares.verifyIdExists,
  // middlewares.validateBody(paymentMethodCreateSchema),
  // middlewares.verifyToken,
  paymentMethodControllers.create
);
paymentMethodRouter.patch(
  "/:id/",
  middlewares.verifyToken,
  paymentMethodControllers.update
);
paymentMethodRouter.delete(
  "/:id",
  middlewares.verifyPaymentMethodExists,
  middlewares.verifyToken,
  paymentMethodControllers.destroy
);
