import { Router } from "express";
import middlewares from "../middlewares";
import { paymentMethodControllers } from "../controllers";

export const paymentMethodRouter: Router = Router();

paymentMethodRouter.post(
  "/:userId",
  middlewares.verifyToken,
  paymentMethodControllers.create
);

paymentMethodRouter.patch(
  "/:id/",
  middlewares.verifyPaymentMethodExists,
  middlewares.verifyToken,
  paymentMethodControllers.update
);

paymentMethodRouter.delete(
  "/:id",
  middlewares.verifyPaymentMethodExists,
  middlewares.verifyToken,
  paymentMethodControllers.destroy
);
