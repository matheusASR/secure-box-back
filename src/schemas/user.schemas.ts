import { z } from "zod";
import { addressCreateSchema } from "./address.schemas";
import { paymentMethodCreateSchema } from "./paymentMethod.schemas";

const userSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(100),
  email: z.string().max(100),
  password: z.string().max(120),
  cpf: z.string().max(11),
  cel: z.string().max(11),
  birthdate: z.string().max(10),
  admin: z.boolean().default(false),
});

const userAddressSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(100),
  email: z.string().max(100),
  password: z.string().max(120),
  cpf: z.string().max(11),
  cel: z.string().max(11),
  birthdate: z.string().max(10),
  address: addressCreateSchema,
})

const userProfileSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(100),
  email: z.string().max(100),
  password: z.string().max(120),
  cpf: z.string().max(11),
  cel: z.string().max(11),
  birthdate: z.string().max(10),
  admin: z.boolean().default(false),
  address: addressCreateSchema,
  paymentMethod: paymentMethodCreateSchema
});

const userLoginSchema = z.object({
  email: z.string().max(100),
  password: z.string().max(120),
});

const userCreateSchema = userAddressSchema.omit({ id: true });
const userReturnSchema = userSchema.omit({
  password: true,
  admin: true,
  cpf: true
});
const userSchemaWid = userSchema.omit({ id: true })
const userReadSchema = userReturnSchema.array();
const userSchemaUpdate = userAddressSchema;

export {
  userSchema,
  userCreateSchema,
  userReturnSchema,
  userReadSchema,
  userLoginSchema,
  userSchemaUpdate,
  userProfileSchema,
  userAddressSchema,
  userSchemaWid
};
