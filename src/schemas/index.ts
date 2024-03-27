import {
  userSchema,
  userCreateSchema,
  userReturnSchema,
  userReadSchema,
  userLoginSchema,
  userSchemaUpdate,
  userProfileSchema,
  userAddressSchema,
  userSchemaWid
} from "./user.schemas";

import { cageSchema, cageCreateSchema, cageReadSchema } from "./cage.schemas";

import { addressCreateSchema, addressSchema } from "./address.schemas";

import {
  allocationSchema,
  allocationCreateSchema,
  allocationReadSchema,
  allocationNotFinishedSchema,
  updateReturn,
} from "./allocation.schemas";

import {
  notificationCreateSchema,
  notificationSchema,
} from "./notification.schemas";

import {
  paymentMethodCreateSchema,
  paymentMethodSchema,
} from "./paymentMethod.schemas";

import { paymentCreateSchema, paymentSchema } from "./payments.schemas";

import { walletCreateSchema, walletSchema } from "./wallet.schemas";

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
  updateReturn,
  addressCreateSchema,
  addressSchema,
  paymentMethodCreateSchema,
  paymentMethodSchema,
  notificationCreateSchema,
  notificationSchema,
  userProfileSchema,
  userAddressSchema,
  paymentCreateSchema,
  paymentSchema,
  walletCreateSchema,
  walletSchema,
  userSchemaWid
};
