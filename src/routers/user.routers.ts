import { Router } from "express";
import middlewares from "../middlewares";
import { userCreateSchema } from "../schemas";
import { userControllers } from "../controllers";

export const userRouter: Router = Router();

userRouter.use("/:id", middlewares.verifyIdExists);

userRouter.post(
  "",
  middlewares.verifyEmailExists,
  middlewares.verifyCelExists,
  middlewares.verifyCpfExists,
  middlewares.validateCpf,
  userControllers.create
);
userRouter.get("", userControllers.read);
userRouter.get("/:id", userControllers.retrieve);
userRouter.patch("/:id", middlewares.verifyToken, middlewares.isAccountOwner, userControllers.update);
userRouter.delete("/:id", userControllers.destroy);