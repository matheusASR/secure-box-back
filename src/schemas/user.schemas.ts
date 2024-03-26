import { z } from "zod";
import { addressCreateSchema } from "./address.schemas";
import { paymentMethodCreateSchema } from "./paymentMethod.schemas";

const userSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(100),
  email: z.string().max(100).email(),
  password: z.string().max(120),
  cpf: z.string().max(11),
  cel: z.string().max(11),
  birthdate: z.string().max(10),
  admin: z.boolean().default(false),
});

const userProfileSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(100),
  email: z.string().max(100).email(),
  password: z.string().max(120),
  cpf: z.string().max(11),
  cel: z.string().max(11),
  birthdate: z.string().max(10),
  admin: z.boolean().default(false),
  address: addressCreateSchema,
  paymentMethods: paymentMethodCreateSchema.array()
});

const userLoginSchema = z.object({
  email: z.string().max(100).email(),
  password: z.string().max(120),
});

const userCreateSchema = userSchema.omit({ id: true });
const userReturnSchema = userSchema.omit({
  password: true,
  admin: true,
  cpf: true
});
const userReadSchema = userReturnSchema.array();
const userSchemaUpdate = userSchema.omit({ password: true, admin: true });
export {
  userSchema,
  userCreateSchema,
  userReturnSchema,
  userReadSchema,
  userLoginSchema,
  userSchemaUpdate,
  userProfileSchema
};
