import { z } from "zod";
import {
  userProfileSchema,
  userCreateSchema,
  userReadSchema,
  userReturnSchema,
  userSchema,
  userSchemaUpdate,
  userSchemaWid
} from "../schemas";
import { Repository } from "typeorm";
import { User } from "../entities";

type IUserReturn = z.infer<typeof userSchema>;
type UserCreate = z.infer<typeof userCreateSchema>;
type UserRead = z.infer<typeof userReadSchema>;
type UserReturn = z.infer<typeof userReturnSchema>;
type IUpdateUser = z.infer<typeof userSchemaUpdate>;
type UserProfile = z.infer<typeof userProfileSchema>;
type UserWid = z.infer<typeof userSchemaWid>;

type UserRepo = Repository<User>;

export {
  UserCreate,
  UserRead,
  UserReturn,
  UserRepo,
  IUserReturn,
  IUpdateUser,
  UserProfile,
  UserWid
};
