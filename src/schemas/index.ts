import {
  userSchema,
  userCreateSchema,
  userReturnSchema,
  userReadSchema,
  userLoginSchema,
  userSchemaUpdate,
} from "./user.schemas";

import { cageSchema, cageCreateSchema, cageReadSchema } from "./cage.schemas";

import {
  allocationSchema,
  allocationCreateSchema,
  allocationReadSchema,
  allocationNotFinishedSchema,
  updateReturn
} from "./allocation.schemas";

export {
  userSchema,
  userCreateSchema,
  userReturnSchema,
  userReadSchema,
  userLoginSchema,
  userSchemaUpdate,
  cageSchema,
  cageCreateSchema,
  cageReadSchema,
  allocationSchema,
  allocationCreateSchema,
  allocationReadSchema,
  allocationNotFinishedSchema,
  updateReturn
};
