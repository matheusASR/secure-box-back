import { Router } from "express";
import middlewares from "../middlewares";
import { paymentMethodCreateSchema } from "../schemas";
import { paymentMethodControllers } from "../controllers";

export const paymentMethodRouter: Router = Router();

paymentMethodRouter.use("/:id", middlewares.verifyIdExists);

paymentMethodRouter.post(
  "/:id",
  middlewares.validateBody(paymentMethodCreateSchema),
  middlewares.verifyToken,
  paymentMethodControllers.create
);
paymentMethodRouter.delete("/:id", middlewares.verifyToken, middlewares.isAccountOwner, paymentMethodControllers.destroy);