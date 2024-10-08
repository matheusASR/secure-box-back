import { Router } from "express";
import middlewares from "../middlewares";
import { userControllers } from "../controllers";
import { userCreateSchema } from "../schemas";

export const userRouter: Router = Router();

userRouter.use("/:id", middlewares.verifyIdExists);

userRouter.post(
  "",
  middlewares.validateBody(userCreateSchema),
  middlewares.verifyEmailExists,
  middlewares.verifyCelExists,
  middlewares.verifyCpfExists,
  // middlewares.validateCpf,
  userControllers.create
);

userRouter.get("", middlewares.isAdmin, userControllers.read);

userRouter.get("/:id",middlewares.isAdmin, userControllers.retrieve);

userRouter.patch(
  "/:id",
  middlewares.verifyToken,
  middlewares.isAccountOwner,
  userControllers.update
);

userRouter.delete(
  "/:id",
  middlewares.verifyToken,
  middlewares.isAccountOwner,
  userControllers.destroy
);

userRouter.patch("",
  // middlewares.verifyEmail,
  userControllers.sendCode
)
